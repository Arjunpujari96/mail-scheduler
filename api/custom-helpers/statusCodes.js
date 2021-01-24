/** 
 * @description All the Error code that needed to be sent to User
 * @type {Object}
*/
module.exports.ErrorCode = Object.freeze({
    'NO_CONTENT_FOUND':204,
    'BAD_REQUEST': 400,
    'EMAIL_NOT_FOUND':402,
    'FORBIDDEN':403,
    'NOT_FOUND':404,
    'VALIDATION_FAILED':422,
    'SOMETHING_WRONG': 500,
    'INTERNAL_ERROR': 501,
    'ALREADY_EXIST':409 
});

/** 
 * @description All the Success code that needed to be sent to User
 * @type {Object}
*/
module.exports.SuccessCode = Object.freeze({
    'SUCCESS': 200,
    'SUCCESSFULLY_CREATED':201
});