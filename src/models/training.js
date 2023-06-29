const mongoose = require('mongoose');

const { handleSchemaValidationErrors } = require('../helpers');

const trainingsSchema = new mongoose.Schema(
  {
    startDate: {
      // type: Date,
      type: Number,
      required: [true, 'Set start date for new training'],
    },
    finishDate: {
      type: Number,
      // type: Date,
      required: [true, 'Set finish date for new training'],
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        // index: true,
      },
    ],
    // results: [
    //   {
    //     date: {
    //       type: Date,
    // required: [true, 'Set date for added read pages'],
    // },
    // pages: {
    //   type: Number,
    // required: [true, 'Set number of pages read for specified time'],
    //     },
    //   },
    // ],
    completed: {
      type: Boolean,
      // required: [true, 'Set completed status'],
      default: false,
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
