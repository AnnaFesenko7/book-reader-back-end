const Joi = require('joi');

const schemaAddTraining = Joi.object({
  startDate: Joi.number()
    // .date()
    // .label('Training Start Date')
    // .iso()
    .required(),

  finishDate: Joi
    // .date()
    .number()
    // .label('Training Finish Date')
    // .iso()
    // .min(Joi.ref('startDate'))
    .required(),

  books: Joi.array()
    // .label('Books Array')
    // .min(1)
    // .items(Joi.object({ _id: Joi.string().required() }))
    // .unique('_id')
    .required(),
});

const schemaUpdateTraining = Joi.object({
  date: Joi.date().label('Reading date').iso().required(),

  pages: Joi.number()
    .label('Number of pages read')
    .integer()
    .positive()
    .min(1)
    .max(999)
    .required(),
});

module.exports = { schemaAddTraining, schemaUpdateTraining };
