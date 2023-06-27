const createError = require('http-errors');

const validationBody = schema => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        createError.BadRequest('missing required name field or name is wrong')
      );
    }
    next();
  };
  return func;
};

module.exports = validationBody;
