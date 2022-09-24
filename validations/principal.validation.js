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
    identification_number: Joi.string()
        .required()
        .max(11)
        .regex(/^[0-9]{11}$/),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone_number: Joi.string()
        .required()
        .regex(
            // eslint-disable-next-line max-len
            /^\+\d{1,5}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,2}[-.\s]?\d{1,1}[-.\s]?\d{1,1}$/
        ),
});

module.exports = {
    loginValidation,
    createTeacher,
};
