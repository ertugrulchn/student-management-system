const express = require('express');
const studentController = require('../controllers/student.controller');
const bodyValidator = require('../middlewares/body-validator.middleware');
const authenticate = require('../middlewares/authentication.middleware');
const authorization = require('../middlewares/authorization.middleware');
const schema = require('../validations/student.validation');
const router = express.Router();

router
    .route('/login')
    .post(bodyValidator(schema.loginValidation), studentController.login);

router
    .route('/reset-password')
    .post(
        authenticate,
        authorization('student'),
        bodyValidator(schema.changePasswordValidation),
        studentController.resetPassword
    );

module.exports = router;
