/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const {
  validateParams
} = require('../../services/validator');
const Joi = require('joi');
const nodemailer = require("nodemailer");
let cron = require('node-cron');
const { ErrorCode, SuccessCode } = require('../../custom-helpers/statusCodes');





module.exports = {



  addSchedule: async (req, res, next) => {
    try {
      const params = {
        subject: Joi.string().min(2).required(),
        body: Joi.string().min(2).required(),
        time: Joi.date().required()
      }

      const errMessage = await validateParams(req, params)

      if (errMessage) {
        response(res, true, ErrorCode.VALIDATION_FAILED, { errMessage }, 'Unprocessable Entry');

      } else {
        var body = req.body;

        body = req.body;
        var mailObj = {};


        var today = new Date();
        var scheduleDate = new Date(body.time);

        if (scheduleDate < today) {
          var status = false
          var statusCode = ErrorCode.VALIDATION_FAILED
          var message = 'Schedule date can not be older then current date & time'

        } else {
          Object.assign(mailObj, {
            subject: body.subject,
            body: body.body,
            time: body.time
          });


          var register = await Schedule.create(mailObj).fetch();

          if (register) {
            var mailData = await Schedule.findOne({
              where: { id: register.id }
            });
          }
          var result = {
            mailData: mailData,
          }

          status = true
          statusCode = SuccessCode.SUCCESS
          message = 'Scheduled Registration successfull'
        }
        response(res, status, statusCode, result, message);

      }

    } catch (err) {
      console.log(err);
      response(res, false, ErrorCode.INTERNAL_ERROR, err, "Schedule registration failed");
    }
  },

  getAllSchedules: async (req, res, next) => {
    try {
      var schedules = await Schedule.find();
      response(res, true, SuccessCode.SUCCESS, schedules, 'All Schedules Fetched successfully');
    } catch (err) {
      console.log(err);
      response(res, false, ErrorCode.INTERNAL_ERROR, err.errMessage, "Internal server error");
    }
  },

  getSchedule: async (req, res, next) => {
    try {
      if (!req.param('scheduleId')) {
        response(res, true, ErrorCode.VALIDATION_FAILED, 'schedules id required', 'Unprocessable Entry');
      } else {

        var schedule = await Schedule.findOne({ id: req.param('scheduleId') })
        if (schedule) {
          response(res, true, SuccessCode.SUCCESS, schedule, 'Schedule find successfull');
        } else {
          response(res, false, ErrorCode.BAD_REQUEST, {}, "Schedule not found");
        }
      }
    } catch (err) {
      console.log(err);
      response(res, false, ErrorCode.INTERNAL_ERROR, err.errMessage, "Internal server error");
    }
  },

  deleteSchedule: async (req, res, next) => {
    try {
      const params = {
        schedule_id: Joi.string().required(),
      }
      const errMessage = await validateParams(req, params)

      if (errMessage) {
        response(res, true, ErrorCode.VALIDATION_FAILED, { errMessage }, 'Unprocessable Entry');
      } else {

        var schedule = await Schedule.destroyOne({ id: req.body.schedule_id })

        if (schedule) {
          response(res, true, SuccessCode.SUCCESS, schedule, 'Schedule deleted successfull');
        } else {
          response(res, false, ErrorCode.BAD_REQUEST, {}, "Schedule not found");
        }
      }
    } catch (err) {
      console.log(err)
      response(res, false, ErrorCode.INTERNAL_ERROR, err.errMessage, "Internal server error");
    }
  },


  updateSchedule: async (req, res, next) => {
    const params = {

      scheduleId: Joi.string().required(),
      subject: Joi.string().min(3),
      body: Joi.string().min(3),
      time: Joi.date()
    }

    const errMessage = await validateParams(req, params)

    if (errMessage) {
      response(res, true, ErrorCode.VALIDATION_FAILED, { errMessage }, 'Unprocessable Entry');
    } else {
      try {

        body = req.body;
        var scheduleObj = {}

        var schedule = Schedule.find({
          id: body.scheduleId
        });

        if (schedule) {
          Object.assign(scheduleObj, {
            subject: body.subject || schedule.subject,
            body: body.body || schedule.body,
            time: body.time || schedule.time
          });

          var today = new Date();
          var scheduleDate = new Date(scheduleObj.time);

          if (scheduleDate < today) {

            var status = false
            var statusCode = ErrorCode.VALIDATION_FAILED
            var message = 'Schedule date can not be older then current date & time'

          } else {
            updateSche = await Schedule.updateOne({ id: body.scheduleId })
              .set({
                subject: scheduleObj.subject,
                body: scheduleObj.body,
                time: scheduleObj.time
              });


            var scheduleData = await Schedule.findOne({
              id: body.scheduleId
            });


            var result = {
              scheduleData: scheduleData,
            }
            var status = true
            var statusCode = SuccessCode.SUCCESS

            var message = 'Schedule successfully updated'
          }
        } else {
          var status = false
          var statusCode = ErrorCode.NOT_FOUND
          var message = 'Schedule not found'
        }

        response(res, status, statusCode, result, message);

      } catch (err) {
        console.log(err)
        response(res, false, ErrorCode.INTERNAL_ERROR, err.errMessage, "Internal server error");
      }
    }
  },


  sendSchedulesMail: async (email, subject, body, userId, scheduleId) => {
    var transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE_PROVIDER,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    var mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: subject,
      text: body
    };

  transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {

       await FailedSchedule.create({
          failed_object: error,
          user_id: userId,
          schedule_id: scheduleId
        });

        return false;
      } else {
        console.log('Email sent: ' + info.response);
        return true;
      }
    });
  },


  startScheduling: async () => {

    var schedules_mails = await Schedule.find();
    var users = await User.find();

    if (users && schedules_mails) {
      schedules_mails.forEach(element => {

        var today = new Date();
        var scheduleDate = new Date(element.time);

        console.log('today date================ ' + today + ' ==================scheduleDate ' + scheduleDate);


        var diffMs = (scheduleDate - today) / 60000;


        console.log('====================' + diffMs);
        if (diffMs >= -1 && diffMs <= 1) {
          users.forEach(user => {
            module.exports.sendSchedulesMail(user.email, element.subject, element.body, user.id, element.id);
          });
        }
      });
    }

  },

 
  getAllFailedSchedules: async (req, res, next) => {
    try {
      var failedSchedule = await FailedSchedule.find();
      response(res, true, SuccessCode.SUCCESS, failedSchedule, 'Failed Schedule fetched successfully');
    } catch (err) {
      console.log(err);
      response(res, false, ErrorCode.INTERNAL_ERROR, err.errMessage, "Internal server error");
    }
  },



};

