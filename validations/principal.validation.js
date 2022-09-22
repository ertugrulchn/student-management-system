// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const Joi = require('joi');

const loginValidation = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string()
        .required()
        .min(8)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()+?])(?=.{8,})/
        ),
});

const createTeacher = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
});

module.exports = {
    loginValidation,
    createTeacher,
};
