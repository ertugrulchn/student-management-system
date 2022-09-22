// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { getOneByQuery } = require('../services/base.service');
const apiError = require('../responses/error/api-error');
const apiSuccess = require('../responses/success/api-success');
const Teacher = require('../models/teacher.model');
const { createLoginToken } = require('../helpers/jwt.helper');

const login = async (req, res) => {
    const teacher = await getOneByQuery(Teacher, {
        email: req.body.email,
    });

    if (teacher <= 0) {
        apiError(
            'Email or password is incorrect',
            httpStatus.UNAUTHORIZED,
            res
        );
        throw Error();
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        teacher.dataValues.password
    );

    if (!validPassword) {
        apiError(
            'Email or password is incorrect',
            httpStatus.UNAUTHORIZED,
            res
        );
        throw Error();
    }

    // ? Create And Assign A Token
    const token = await createLoginToken(teacher, res);

    apiSuccess(
        'Login Success',
        { access_token: token },
        true,
        httpStatus.OK,
        res
    );
};

module.exports = {
    login,
};
