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

const changePasswordValidation = Joi.object({
    old_password: Joi.string()
        .required()
        .min(8)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()+?])(?=.{8,})/
        ),
    new_password: Joi.string()
        .required()
        .min(8)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()+?])(?=.{8,})/
        ),
});

module.exports = {
    loginValidation,
    changePasswordValidation,
};
