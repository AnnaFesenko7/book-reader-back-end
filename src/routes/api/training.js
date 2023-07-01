const express = require('express');
const router = express.Router();
const { training: ctrl } = require('../../controllers');

const {
  authenticate,
  validationBody,
  ctrlWrapper,
} = require('../../middlewares');

const { training: trainingSchemas } = require('../../joiSchemas');

router.get('/', authenticate, ctrlWrapper(ctrl.getTraining));

router.post(
  '/',
  authenticate,
  // validationBody(trainingSchemas.schemaAddTraining),
  ctrlWrapper(ctrl.addTraining)
);

router.put(
  '/',
  authenticate,
  // validationBody(trainingSchemas.schemaUpdateTraining),
  ctrlWrapper(ctrl.updateTraining)
);

module.exports = router;
