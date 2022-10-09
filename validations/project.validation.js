const Joi = require('joi');

const createProject = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    teacher_id: Joi.string(),
});

module.exports = {
    createProject,
};
