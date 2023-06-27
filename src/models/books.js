const mongoose = require('mongoose');
const { yearRegExp } = require('../regularExpressions');
const { handleMongooseError } = require('../helpers');
const { statusList } = require('../valuesLists');
const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    // match: yearRegExp,
  },
  pages: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'toRead',
    enum: statusList,
  },
  rating: {
    type: Number,
    default: 0,
  },
  resume: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

booksSchema.post('save', handleMongooseError);

const Book = mongoose.model('book', booksSchema);

module.exports = Book;
