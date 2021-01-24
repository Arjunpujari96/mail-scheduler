const Joi = require('joi');
const lodash = require('lodash');

/**
 * @function ValidateParams
 * @param {object} req
 * @description  Validate all request parameter (query & body param's)
 * @author Arjun Singh Pujari
 */

const validateParams = async (req,paramSchema) => {

        const schema = Joi.object().keys(paramSchema);
        const paramSchemaKeys = Object.keys(paramSchema);

        let requestParamObj = {};
        for (let key of paramSchemaKeys){
            requestParamObj[key] = lodash.get(req.body, key);
        }
        try{
           await schema.validateAsync(requestParamObj);

        } catch (err) {

          return err.message;
        }
};


module.exports = {
    validateParams: validateParams
};
