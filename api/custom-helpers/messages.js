/** 
 * @description All the Error messages that needed to be sent to Admin
 * @type {Object}
 */
module.exports.ErrorMessage = Object.freeze({

    INVALID_TOKEN: 'Session Expired',
    INTERNAL_ERROR: 'Internal Server Error',
    SOMETHING_WRONG: 'Something went wrong!',
    SESSION_EXPIRE: 'Session Expired!',
    FIELD_VALIDATION: 'Field Validation Failed',
    EMAIL_EXIST: 'Email already exist',
    DATA_EXIST: 'Data already exist in system',
    DATA_NOT_EXIST: 'Data not exist in system',
    INVALID_EMAIL: 'Invalid email',
});

/** 
 * @description All the Success messages that needed to be sent to Admin
 * @type {Object}
 */
module.exports.SuccessMessage = Object.freeze({
    
    SUCCESS: 'Success',
    ADD_SUCCESS: 'Schedules email add successfully.',
    UPDATE_POST_SUCCESS: 'Schedules email updated successfully',
    SCHEDULE_DATA: 'Schedules email list'
});