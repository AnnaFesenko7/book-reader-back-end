const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');

const { authenticate, validationBody } = require('../../middlewares');
const { auth } = require('../../joiSchemas');

router.post('/register', validationBody(auth.registerSchema), ctrl.register);

router.post('/login', validationBody(auth.loginSchema), ctrl.login);

router.get('/logout', authenticate, ctrl.logout);

module.exports = router;
