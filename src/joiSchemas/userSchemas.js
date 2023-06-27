const joi = require('joi');
const { langList } = require('../valuesLists');
const changeLangSchema = joi.object({
  language: joi
    .string()
    .valid(...langList)
    .required(),
});

const changeTrainingStatusSchema = joi.object({
  isTrainingStarted: joi.boolean().required(),
});
module.exports = {
  changeLangSchema,
  changeTrainingStatusSchema,
};
