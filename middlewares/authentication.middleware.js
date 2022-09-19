// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const apiError = require('../responses/error/api-error');

module.exports = async function (req, res, next) {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
        apiError('Access Denied', httpStatus.UNAUTHORIZED, res);
        throw Error();
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            apiError('Invalid access token', httpStatus.BAD_REQUEST, res);
            throw Error();
        }

        req.user = decoded;

        next();
    });
};
