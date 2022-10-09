const express = require('express');
const controller = require('../controllers/class.controller');
const authenticate = require('../middlewares/authentication.middleware');
const authorization = require('../middlewares/authorization.middleware');
const bodyValidator = require('../middlewares/body-validator.middleware');
const schema = require('../validations/class.validation');
const router = express.Router();

router.route('/').get(authenticate, controller.getAllClass);

router
    .route('/')
    .post(
        authenticate,
        authorization('principal'),
        bodyValidator(schema.createClass),
        controller.createClass
    );

module.exports = router;
