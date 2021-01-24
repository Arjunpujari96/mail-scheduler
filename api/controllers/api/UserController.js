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
const { SuccessCode } = require('../../custom-helpers/statusCodes');


module.exports = {
    registerUserAccount: async (req, res, next) => {
        try {
            const params = {
                name: Joi.string().min(3).max(15).required(),
                email: Joi.string().email({ tlds: { allow: false } }).required(),
            }

            const errMessage = await validateParams(req, params)

            if (errMessage) {
                response(res, true, ErrorCode.VALIDATION_FAILED, { errMessage }, 'Unprocessable Entry');

            } else {

                body = req.body;
                var userObj = {};

                var isRecordExist = await User.findOne({
                    email: body.email,
                });

                if (!isRecordExist) {

                    Object.assign(userObj, {
                        name: body.name,
                        email: body.email,
                    });

                    var register = await User.create(userObj).fetch();

                    if (register) {
                        var userData = await User.findOne({
                            where: { email: register.email }
                        });
                    }

                    var result = {
                        userData: userData,
                    }
                    response(res, true, SuccessCode.SUCCESSFULLY_CREATED, result, 'Registration successfull');
                } else {
                    response(res, false, ErrorCode.ALREADY_EXIST, {}, "User is already registered");
                }
            }
        } catch (err) {
            response(res, false, ErrorCode.INTERNAL_ERROR, err, "User registration failed");
        }
    },


    deleteUserAccount: async (req, res, next) => {
        try {
            const params = {
                email: Joi.string().required(),

            }
            const errMessage = await validateParams(req, params)

            if (errMessage) {
                response(res, true, ErrorCode.VALIDATION_FAILED, { errMessage }, 'Unprocessable Entry');

            } else {
                var userData = await User.findOne({
                    email: req.body.email
                });
                


                if (userData) {
                    User.destroyOne({ email: req.body.email })
                    var status = true
                    var statusCode = SuccessCode.SUCCESS;
                    var message = 'Account Delete successfully'
                } else {
                    var status = false
                    var statusCode = ErrorCode.NOT_FOUND;
                    var message = 'Not found'
                }

                response(res, status, statusCode, userData, message);
            }
        } catch (err) {
            console.log(err)
            response(res, false, ErrorCode.INTERNAL_ERROR, err, "Internal server error");
        }
    },


    getAllUsers: async (req, res, next) => {
        try {
          var users = await User.find();
          response(res, true, SuccessCode.SUCCESS, users, 'User fetched successfully');
        } catch (err) {
          console.log(err);
          response(res, false, ErrorCode.INTERNAL_ERROR, err.errMessage, "Internal server error");
        }
      },

};

