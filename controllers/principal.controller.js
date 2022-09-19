const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Principal = require('../models/principal.model');
const { getOneByQuery } = require('../services/base.service');
const apiError = require('../responses/error/api-error');
const apiSuccess = require('../responses/success/api-success');

const login = async (req, res, next) => {
    const principal = await getOneByQuery(Principal, {
        email: req.body.email,
    });

    if (principal <= 0) {
        apiError(
            'Email or password is incorrect',
            httpStatus.UNAUTHORIZED,
            res
        );
        throw Error();
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        principal.dataValues.password
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
    const token = jwt.sign(
        {
            id: principal.dataValues.id,
            first_name: principal.dataValues.first_name,
            last_name: principal.dataValues.last_name,
            email: principal.dataValues.email,
            type: principal.dataValues.type,
        },
        process.env.TOKEN_SECRET
    );
    res.header('token', token);

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
