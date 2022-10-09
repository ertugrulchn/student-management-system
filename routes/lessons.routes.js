const express = require('express');
const controller = require('../controllers/lesson.controller');
const authenticate = require('../middlewares/authentication.middleware');
const authorization = require('../middlewares/authorization.middleware');
const bodyValidator = require('../middlewares/body-validator.middleware');
const schema = require('../validations/lesson.validation');
const router = express.Router();

router.route('/').get(authenticate, controller.getAllLesson);

router
    .route('/')
    .post(
        authenticate,
        authorization('principal'),
        bodyValidator(schema.createLesson),
        controller.createLesson
    );

module.exports = router;
