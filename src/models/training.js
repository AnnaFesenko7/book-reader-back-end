const { Schema, SchemaTypes, model } = require('mongoose');

const { handleSchemaValidationErrors } = require('../helpers');

const trainingSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: [true, 'Set start date for new training'],
    },
    finishDate: {
      type: Date,
      required: [true, 'Set finish date for new training'],
    },
    books: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'book',
        index: true,
      },
    ],
    results: [
      {
        date: {
          type: Date,
          required: [true, 'Set date for added read pages'],
        },
        pages: {
          type: Number,
          required: [true, 'Set number of pages read for specified time'],
        },
      },
    ],
    completed: {
      type: Boolean,
      required: [true, 'Set completed status'],
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

trainingSchema.post('save', handleSchemaValidationErrors);

const Training = model('Training', trainingSchema);

module.exports = {
  Training,
};
