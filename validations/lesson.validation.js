const Joi = require('joi');

const createLesson = Joi.object({
    name: Joi.string().required(),
    level: Joi.string().required(),
    teacher_id: Joi.string().required(),
});

module.exports = {
    createLesson,
};
