const mongoose = require('mongoose');
const { completenessReasonList } = require('../valuesLists');
const { handleSchemaValidationErrors } = require('../helpers');

const trainingsSchema = new mongoose.Schema(
  {
    startDate: {
      type: Number,
      required: [true, 'Set start date for new training'],
    },
    finishDate: {
      type: Number,
      required: [true, 'Set finish date for new training'],
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        // index: true,
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
      default: false,
    },
    completenessReason: {
      type: String,
      enum: completenessReasonList,
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// trainingSchema.post('save', handleSchemaValidationErrors);

const Training = mongoose.model('training', trainingsSchema);

module.exports = Training;
