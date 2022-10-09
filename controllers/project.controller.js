const httpStatus = require('http-status');
const Project = require('../models/project.model');
const Teacher = require('../models/teacher.model');
const apiError = require('../responses/error/api-error');
const apiDataSuccess = require('../responses/success/api-data-success');
const apiSuccess = require('../responses/success/api-success');
const { getByQuery, create } = require('../services/base.service');

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

const createProject = async (req, res) => {
    console.log('asdsa');
    const newProject = {
        name: req.body.name,
        description: req.body.description,
        teacherId: req.body.teacher_id,
    };

    const project = await getByQuery(Project, {
        where: { teacherId: req.body.teacher_id },
    });

    if (Object.keys(project).length !== 0) {
        apiError(
            'This Teacher Already Have A Project',
            httpStatus.NOT_FOUND,
            res
        );
        throw Error();
    }

    const createdProject = await create(Project, newProject);

    apiSuccess(
        'Project Created Successfully',
        createdProject,
        true,
        httpStatus.OK,
        res
    );
};

module.exports = {
    getAllProjects,
    createProject,
};
