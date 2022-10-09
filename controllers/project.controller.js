const httpStatus = require('http-status');
const Project = require('../models/project.model');
const Teacher = require('../models/teacher.model');
const apiDataSuccess = require('../responses/success/api-data-success');

const getAllProjects = async (req, res) => {
    const projects = await Project.findAll({
        include: [
            {
                model: Teacher,
                as: 'teachers',
            },
        ],
    });

    let response = [];

    for (const data of projects) {
        delete data.dataValues.teachers.dataValues.password;
        delete data.dataValues.teachers.dataValues.identificationNumber;

        response.push(data);
    }

    apiDataSuccess(
        'Projects Fetched Successfully',
        response,
        true,
        httpStatus.OK,
        res
    );
};

module.exports = {
    getAllProjects,
};
