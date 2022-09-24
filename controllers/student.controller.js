const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { getOneByQuery, updateByQuery } = require('../services/base.service');
const apiError = require('../responses/error/api-error');
const apiDataSuccess = require('../responses/success/api-data-success');
const apiSuccess = require('../responses/success/api-success');
const Student = require('../models/student.model');
const { createLoginToken } = require('../helpers/jwt.helper');
const { passwordToHash } = require('../helpers/password.helper');

const login = async (req, res) => {
    console.log(req.body.email);

    const student = await getOneByQuery(Student, {
        email: req.body.email,
    });

    if (student <= 0) {
        apiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
        throw Error();
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        student.dataValues.password
    );

    if (!validPassword) {
        apiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
        throw Error();
    }

    // ? Create And Assign A Token
    const token = await createLoginToken(student, res);

    apiDataSuccess(
        'Login Success',
        { access_token: token },
        true,
        httpStatus.OK,
        res
    );
};

const resetPassword = async (req, res) => {
    const student = await getOneByQuery(Student, { email: req.user.email });

    if (student <= 0) {
        apiError('Student Not Found', httpStatus.NOT_FOUND, res);
        throw Error();
    }

    const isValidOldPassword = await bcrypt.compare(
        req.body.old_password,
        student.dataValues.password
    );

    if (!isValidOldPassword) {
        apiError('The password is incorrect', httpStatus.BAD_REQUEST, res);
        throw Error();
    }

    const newPassword = await passwordToHash(req.body.new_password);

    await updateByQuery(
        Student,
        { email: req.user.email },
        { password: newPassword.hashedPassword }
    );

    apiSuccess('Password Changed Successfully', true, httpStatus.OK, res);
};

module.exports = {
    login,
    resetPassword,
};
