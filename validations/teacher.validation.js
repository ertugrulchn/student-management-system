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

const changePasswordValidation = Joi.object({
    old_password: JoiPassword.string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .min(8)
        .required(),
    new_password: JoiPassword.string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .min(8)
        .required(),
});

module.exports = {
    loginValidation,
    changePasswordValidation,
};
