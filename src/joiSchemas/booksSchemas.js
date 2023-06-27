const Joi = require('joi');
const { yearRegExp } = require('../regularExpressions');
const { statusList } = require('../valuesLists');
const addBook = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number()
    .integer()
    // .pattern(yearRegExp)
    .allow(''),
  pages: Joi.number().integer().required(),
});

const updateStatus = Joi.object({
  status: Joi.string()
    .valid(...statusList)
    .required(),
});

const updateRating = Joi.object({
  rating: Joi.number().integer().min(0).max(6).required(),
  resume: Joi.string().allow('').required(),
});

module.exports = {
  addBook,
  updateStatus,
  updateRating,
};

// const editBookValidation = (req, res, next) => {
//   const schema = Joi.object({
//     title: Joi.string(),
//     author: Joi.string(),
//     year: Joi.number().integer(),
//     pages: Joi.number().integer(),
//     status: Joi.string(),
//     rating: Joi.number().integer().greater(0).less(6),
//     resume: Joi.string(),
//   });
//   const valid = schema.validate(req.body);

//   if (valid.error) {
//     return res.status(400).json({
//       status: valid.error,
//     });
//   }
//   next();
// };
