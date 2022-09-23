const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { getOneByQuery, updateByQuery } = require('../services/base.service');
const apiError = require('../responses/error/api-error');
const apiDataSuccess = require('../responses/success/api-data-success');
const apiSuccess = require('../responses/success/api-success');
const Teacher = require('../models/teacher.model');
const { createLoginToken } = require('../helpers/jwt.helper');
const { passwordToHash } = require('../helpers/password.helper');

const login = async (req, res) => {
    const teacher = await getOneByQuery(Teacher, {
        email: req.body.email,
    });

    if (teacher <= 0) {
        apiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
        throw Error();
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        teacher.dataValues.password
    );

    if (!validPassword) {
        apiError('Email or password is incorrect', httpStatus.BAD_REQUEST, res);
        throw Error();
    }

    // ? Create And Assign A Token
    const token = await createLoginToken(teacher, res);

    apiDataSuccess(
        'Login Success',
        { access_token: token },
        true,
        httpStatus.OK,
        res
    );
};

const resetPassword = async (req, res) => {
    const teacher = await getOneByQuery(Teacher, { email: req.user.email });

    if (teacher <= 0) {
        apiError('Teacher Not Found', httpStatus.NOT_FOUND, res);
        throw Error();
    }

    const isValidOldPassword = await bcrypt.compare(
        req.body.old_password,
        teacher.dataValues.password
    );

    if (!isValidOldPassword) {
        apiError('The password is incorrect', httpStatus.BAD_REQUEST, res);
        throw Error();
    }

    const newPassword = await passwordToHash(req.body.new_password);

    await updateByQuery(
        Teacher,
        { email: req.user.email },
        { password: newPassword.hashedPassword }
    );

    apiSuccess('Password Changed Successfully', true, httpStatus.OK, res);
};

module.exports = {
    login,
    resetPassword,
};
