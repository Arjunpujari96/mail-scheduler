let {
  apiResponse
} = require('../custom-helpers/responseHelper')
global.response = apiResponse;


let {
  SuccessMessage,
  ErrorMessage
} = require('../custom-helpers/messages')
global.SuccessMessage = SuccessMessage;
global.ErrorMessage = ErrorMessage;


let {
  SuccessCode,
  ErrorCode
} = require('../custom-helpers/statusCodes')
global.SuccessCode = SuccessCode;
global.ErrorCode = ErrorCode;



