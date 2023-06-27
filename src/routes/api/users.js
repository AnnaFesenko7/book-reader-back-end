const express = require('express');
const router = express.Router();
const { users: ctrl } = require('../../controllers');
const { authenticate, validationBody } = require('../../middlewares');

const { users } = require('../../joiSchemas');

router.get('/current', authenticate, ctrl.getCurrent);

router.put(
  '/language',
  validationBody(users.changeLangSchema),
  authenticate,
  ctrl.changeLang
);

router.put(
  '/trainingStatus',
  validationBody(users.changeTrainingStatusSchema),
  authenticate,
  ctrl.changeTrainingStatus
);
module.exports = router;
