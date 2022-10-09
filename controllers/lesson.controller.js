const httpStatus = require('http-status');
const Lesson = require('../models/lesson.model');
const Teacher = require('../models/teacher.model');
const apiDataSuccess = require('../responses/success/api-data-success');

const getAllLesson = async (req, res) => {
    const lessons = await Lesson.findAll({
        include: [
            {
                model: Teacher,
                as: 'teachers',
            },
        ],
    });

    let response = [];

    for (const data of lessons) {
        delete data.dataValues.teachers.dataValues.password;
        delete data.dataValues.teachers.dataValues.identificationNumber;

        response.push(data);
    }

    apiDataSuccess(
        'Lessons Fetched Successfully',
        response,
        true,
        httpStatus.OK,
        res
    );
};

module.exports = {
    getAllLesson,
};
