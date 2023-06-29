const express = require('express');
const router = express.Router();

const {
  authenticate,
  validationBody,
  isValidId,
} = require('../../middlewares');

const { books: joiSchema } = require('../../joiSchemas');
const { books: ctrl } = require('../../controllers');

router.use(authenticate);

router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', validationBody(joiSchema.addBook), ctrl.add);

router.patch(
  '/status/:id',
  isValidId,
  validationBody(joiSchema.updateStatus),
  ctrl.updateStatus
);

router.patch(
  '/opinion/:id',
  isValidId,
  validationBody(joiSchema.updateRating),
  ctrl.updateRating
);

// router.put('/edit/:bookId', editBookValidation, editBookController);

router.delete('/:id', isValidId, ctrl.deleteBook);

module.exports = router;
