const httpStatus = require('http-status');
const Class = require('../models/class.model');
const Student = require('../models/student.model');
const apiError = require('../responses/error/api-error');
const apiDataSuccess = require('../responses/success/api-data-success');
const { getByQuery, getAll, create } = require('../services/base.service');

const getAllClass = async (req, res) => {
    const classData = await getAll(Class);

    const studentData = await getByQuery(Student, {
        include: [
            {
                model: Class,
                as: 'classes',
            },
        ],
    });

    let response = [];
    let students = [];

    for (const data of classData) {
        students = [];

        for (const student of studentData) {
            delete student.dataValues.password;
            delete student.dataValues.identificationNumber;
            delete student.dataValues.classes;

            if (student.dataValues.classId == data.dataValues.id) {
                students.push(student);
            }
        }

        data.dataValues.students = students;

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

const createClass = async (req, res) => {
    const newClass = {
        className: req.body.class_name,
    };

    const className = await Class.findOne({
        where: { className: req.body.class_name },
    });

    if (className) {
        apiError('This Class Already Exists', httpStatus.BAD_REQUEST, res);
        throw Error();
    }

    const createdClass = await create(Class, newClass);

    apiDataSuccess(
        'Class Created Successfully',
        createdClass,
        true,
        httpStatus.OK,
        res
    );
};

module.exports = {
    getAllClass,
    createClass,
};
