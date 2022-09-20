const express = require('express');
const principalController = require('../controllers/principal.controller');
const bodyValidator = require('../middlewares/body-validator.middleware');
const schema = require('../validations/principal.validation');
const router = express.Router();

router
    .route('/login')
    .post(bodyValidator(schema.loginValidation), principalController.login);

module.exports = router;
