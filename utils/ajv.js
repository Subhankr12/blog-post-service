const Ajv = require('ajv');
const formats = require('ajv-formats');

const ajv = new Ajv({ strict: false });
const { isArray } = Array;
formats(ajv);

ajv.addFormat('number', /^\d+$/);
ajv.addFormat('mongoId', /^[a-f\d]{24}$/);
ajv.addFormat('email', /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/);

const validate = (req, res, next) => {
  req.validate = (data, properties, required = [], options = {}) => {
    let requestData;
    if (data === 'query') requestData = req.query;
    else if (data === 'body') requestData = req.body;
    else if (data === 'params') requestData = req.params;

    let schema = {
      type: 'object',
      properties,
      additionalProperties: false,
      ...options,
    };
    if (isArray(required)) schema.required = required;
    else schema = { ...schema, ...required };

    const validator = ajv.compile(schema);
    const isValid = validator(requestData);
    if (!isValid) {
      req.isValidationError = true;
      const error = { error: true, message: validator.errors };
      throw error;
    }
  };
  next();
};

module.exports = validate;
