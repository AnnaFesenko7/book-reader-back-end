const express = require('express');
const router = express.Router();
const { training: ctrl } = require('../../controllers');
// const { auth: ctrl } = require('../../controllers');

const {
  validationBody,
  authenticate,
  ctrlWrapper,
} = require('../../middlewares');
const { trainingSchemas } = require('../../models');

router.get('/', authenticate, ctrlWrapper(ctrl.getTraining));

router.post(
  '/',
  authenticate,
  validationBody(trainingSchemas.schemaAddTraining),
  ctrlWrapper(ctrl.addTraining)
);

router.patch(
  '/',
  authenticate,
  validationBody(trainingSchemas.schemaUpdateTraining),
  ctrlWrapper(ctrl.updateTraining)
);

module.exports = router;
