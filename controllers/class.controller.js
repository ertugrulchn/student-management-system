const httpStatus = require('http-status');
const Class = require('../models/class.model');
const Student = require('../models/student.model');
const apiDataSuccess = require('../responses/success/api-data-success');
const { getByQuery, getAll } = require('../services/base.service');

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

module.exports = {
    getAllClass,
};
