const express = require('express');
const teacherController = require('../controllers/teacher.controller');
const bodyValidator = require('../middlewares/body-validator.middleware');
const authenticate = require('../middlewares/authentication.middleware');
const authorization = require('../middlewares/authorization.middleware');
const schema = require('../validations/teacher.validation');
const router = express.Router();

router
    .route('/login')
    .post(bodyValidator(schema.loginValidation), teacherController.login);

router
    .route('/reset-password')
    .post(
        authenticate,
        authorization('teacher'),
        bodyValidator(schema.changePasswordValidation),
        teacherController.resetPassword
    );

module.exports = router;
