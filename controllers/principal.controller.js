const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const Principal = require('../models/principal.model');
const { getOneByQuery, create } = require('../services/base.service');
const apiError = require('../responses/error/api-error');
const apiSuccess = require('../responses/success/api-data-success');
const Teacher = require('../models/teacher.model');
const passwordHelper = require('../helpers/password.helper');
const { createLoginToken } = require('../helpers/jwt.helper');
const eventEmitter = require('../events/event-emitter.event');
const generatePassword = require('../helpers/password-generator.helper');
const Student = require('../models/student.model');

const login = async (req, res) => {
    const principal = await getOneByQuery(Principal, {
        email: req.body.email,
    });

    if (principal <= 0) {
        apiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
        throw Error();
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        principal.dataValues.password
    );

    if (!validPassword) {
        apiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
        throw Error();
    }

    // ? Create And Assign A Token
    const token = await createLoginToken(principal, res);

    apiSuccess(
        'Login Success',
        { access_token: token },
        true,
        httpStatus.OK,
        res
    );
};

const createTeacher = async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        identification_number,
        phone_number,
    } = req.body;

    const teacherPassword = generatePassword();

    const passwordToHash = await passwordHelper.passwordToHash(teacherPassword);

    const password = passwordToHash.hashedPassword;

    const teacherData = {
        identification_number,
        first_name,
        last_name,
        email,
        password,
        phone_number,
    };

    const createdTeacher = await create(Teacher, teacherData);

    eventEmitter.emit('send_email', {
        to: email,
        subject: 'Teacher Password',
        template: 'teacher-password-template',
        context: {
            fullName: first_name + ' ' + last_name,
            password: teacherPassword,
        },
    });

    delete createdTeacher.dataValues.password;
    delete createdTeacher.dataValues.identification_number;

    apiSuccess(
        'Teacher Created Successfully',
        createdTeacher,
        true,
        httpStatus.OK,
        res
    );
};

const createStudent = async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        identification_number,
        phone_number,
    } = req.body;

    const studentPassword = generatePassword();

    const passwordToHash = await passwordHelper.passwordToHash(studentPassword);

    const password = passwordToHash.hashedPassword;

    const studentData = {
        identification_number,
        first_name,
        last_name,
        email,
        password,
        phone_number,
    };

    const createdStudent = await create(Student, studentData);

    eventEmitter.emit('send_email', {
        to: email,
        subject: 'Naci Orhan Student Password',
        template: 'student-password-template',
        context: {
            fullName: first_name + ' ' + last_name,
            password: studentPassword,
        },
    });

    delete createdStudent.dataValues.password;
    delete createdStudent.dataValues.identification_number;

    apiSuccess(
        'Student Created Successfully',
        createdStudent,
        true,
        httpStatus.OK,
        res
    );
};

module.exports = {
    login,
    createTeacher,
    createStudent,
};
