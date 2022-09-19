// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

module.exports = async function (req, res, next) {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
        return next(
            res.status(httpStatus.UNAUTHORIZED).json({
                message: 'Access Denied',
                isSuccess: false,
            })
        );
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return next(
                res.status(httpStatus.BAD_REQUEST).json({
                    message: 'Invalid access token',
                    isSuccess: false,
                })
            );
        }

        req.user = decoded;

        next();
    });
};
