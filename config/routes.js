/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },




  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  'POST /api/v1/add-schedule-mail' :'api/ScheduleController.addSchedule',
  'GET /api/v1/get-schedule-mail' :'api/ScheduleController.getSchedule',
  'GET /api/v1/get-all-schedule-mails' :'api/ScheduleController.getAllSchedules',
  'DELETE /api/v1/delete-schedule-mail' :'api/ScheduleController.deleteSchedule',
  'PATCH /api/v1/update-schedule-mail' :'api/ScheduleController.updateSchedule',


  'POST /api/v1/add-user-account' :'api/UserController.registerUserAccount',
  'GET /api/v1/get-all-accounts' :'api/UserController.getAllUsers',
  'DELETE /api/v1/delete-user-account' :'api/UserController.deleteUserAccount',


  'GET /api/v1/get-all-failed-schedules' :'api/ScheduleController.getAllFailedSchedules',
  
};
