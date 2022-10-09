const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const loginValidation = Joi.object({
    email: Joi.string().required().email(),
    password: JoiPassword.string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .min(8)
        .required(),
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

const createStudent = Joi.object({
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
    class_id: Joi.string().required(),
});

module.exports = {
    loginValidation,
    createTeacher,
    createStudent,
};
