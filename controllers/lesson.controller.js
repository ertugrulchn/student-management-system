const httpStatus = require('http-status');
const Lesson = require('../models/lesson.model');
const Teacher = require('../models/teacher.model');
const apiError = require('../responses/error/api-error');
const apiDataSuccess = require('../responses/success/api-data-success');
const apiSuccess = require('../responses/success/api-success');
const { getByQuery, create } = require('../services/base.service');

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

const createLesson = async (req, res) => {
    const newLesson = {
        name: req.body.name,
        level: req.body.level,
        teacherId: req.body.teacher_id,
    };

    const lesson = await getByQuery(Lesson, {
        where: { teacherId: req.body.teacher_id },
    });

    if (Object.keys(lesson).length !== 0) {
        apiError(
            'This Teacher Already Have A Lesson',
            httpStatus.NOT_FOUND,
            res
        );
        throw Error();
    }

    const createdLesson = await create(Lesson, newLesson);

    apiSuccess(
        'Lesson Created Successfully',
        createdLesson,
        true,
        httpStatus.OK,
        res
    );
};

module.exports = {
    getAllLesson,
    createLesson,
};
