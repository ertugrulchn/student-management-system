const Joi = require('joi');

const createClass = Joi.object({
    class_name: Joi.string().required(),
});

module.exports = {
    createClass,
};
