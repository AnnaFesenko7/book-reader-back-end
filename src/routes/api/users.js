const express = require('express');
const router = express.Router();
const { users: ctrl } = require('../../controllers');
const { authenticate, ctrlWrapper } = require('../../middlewares');

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));
module.exports = router;

router.put('/language', authenticate, ctrlWrapper(ctrl.changeLang));
module.exports = router;
