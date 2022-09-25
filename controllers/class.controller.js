const httpStatus = require('http-status');
const Class = require('../models/class.model');
const Teacher = require('../models/teacher.model');
const apiDataSuccess = require('../responses/success/api-data-success');
const { getByQuery } = require('../services/base.service');

const getAllClass = async (req, res) => {
    const classData = await getByQuery(Class, {
        include: [
            {
                model: Teacher,
                as: 'teachers',
            },
        ],
    });

    let response = [];

    for (const data of classData) {
        delete data.dataValues.teachers.dataValues.password;

        response.push(data);
    }

    apiDataSuccess(
        'Classes Fetched Successfully',
        response,
        true,
        httpStatus.OK,
        res
    );
};

module.exports = {
    getAllClass,
};
