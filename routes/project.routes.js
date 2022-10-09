const express = require('express');
const controller = require('../controllers/project.controller');
const authenticate = require('../middlewares/authentication.middleware');
const authorization = require('../middlewares/authorization.middleware');
const bodyValidator = require('../middlewares/body-validator.middleware');
const schema = require('../validations/project.validation');
const router = express.Router();

router.route('/').get(controller.getAllProjects);

router
    .route('/')
    .post(
        authenticate,
        authorization('principal'),
        bodyValidator(schema.createProject),
        controller.createProject
    );

module.exports = router;
