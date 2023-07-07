const express = require('express');
const router = express.Router();
const { training: ctrl } = require('../../controllers');

const { authenticate, validationBody } = require('../../middlewares');

const { training: trainingSchemas } = require('../../joiSchemas');

router.get('/', authenticate, ctrl.completeness, ctrl.getTraining);

router.post(
  '/',
  authenticate,
  // validationBody(trainingSchemas.schemaAddTraining),
  ctrl.addTraining
);
router.delete(
  '/',
  authenticate,
  // validationBody(trainingSchemas.schemaAddTraining),
  ctrl.deleteTraining
);

router.patch(
  '/results',
  authenticate,
  // validationBody(trainingSchemas.schemaUpdateTraining),
  ctrl.addResults
);
router.patch(
  '/completeness',
  authenticate,
  // validationBody(trainingSchemas.schemaUpdateTraining),
  ctrl.completeness
);

module.exports = router;
