const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Principal = require('../models/principal.model');
const { getOneByQuery } = require('../services/base.service');

const login = async (req, res, next) => {
    const principal = await getOneByQuery(Principal, {
        email: req.body.email,
    });

    if (principal <= 0) {
        return next(
            res.status(httpStatus.BAD_REQUEST).json({
                message: 'Email or password is incorrect',
                isSuccess: false,
            })
        );
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        principal.dataValues.password
    );

    if (!validPassword) {
        return next(
            res.status(httpStatus.BAD_REQUEST).json({
                message: 'Email or password is incorrect',
                isSuccess: false,
            })
        );
    }

    // ? Create And Assign A Token
    const token = jwt.sign(
        {
            id: principal.dataValues.id,
            first_name: principal.dataValues.first_name,
            last_name: principal.dataValues.last_name,
            email: principal.dataValues.email,
        },
        process.env.TOKEN_SECRET
    );
    res.header('token', token);

    return res.status(httpStatus.OK).json({
        message: 'Login Success',
        data: {
            access_token: token,
        },
        isSuccess: true,
    });
};

module.exports = {
    login,
};
