// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const express = require('express');
const teacherController = require('../controllers/teacher.controller');
const bodyValidator = require('../middlewares/body-validator.middleware');
const schema = require('../validations/teacher.validation');
const router = express.Router();

router
    .route('/login')
    .post(bodyValidator(schema.loginValidation), teacherController.login);

module.exports = router;
