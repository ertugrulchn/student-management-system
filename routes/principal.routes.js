const express = require('express');
const principalController = require('../controllers/principal.controller');
const bodyValidator = require('../middlewares/body-validator.middleware');
const authenticate = require('../middlewares/authentication.middleware');
const authorization = require('../middlewares/authorization.middleware');
const schema = require('../validations/principal.validation');
const router = express.Router();

router
    .route('/login')
    .post(bodyValidator(schema.loginValidation), principalController.login);

router
    .route('/teacher')
    .post(
        authenticate,
        authorization('principal'),
        bodyValidator(schema.createTeacher),
        principalController.createTeacher
    );

router
    .route('/student')
    .post(
        authenticate,
        authorization('principal'),
        bodyValidator(schema.createStudent),
        principalController.createStudent
    );

router
    .route('/class')
    .post(
        authenticate,
        authorization('principal'),
        bodyValidator(schema.createClass),
        principalController.createClass
    );

router
    .route('/lesson')
    .post(
        authenticate,
        authorization('principal'),
        bodyValidator(schema.createLesson),
        principalController.createLesson
    );

router
    .route('/project')
    .post(
        authenticate,
        authorization('principal'),
        bodyValidator(schema.createProject),
        principalController.createProject
    );

module.exports = router;
