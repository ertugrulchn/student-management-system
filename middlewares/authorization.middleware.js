// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const httpStatus = require('http-status');
const apiError = require('../responses/error/api-error');

const authorization = (...roles) =>(req, res, next) => {
    const userRole = req.user.type.toLowerCase();

    const isPrincipal = userRole === 'principal';

    if (isPrincipal) {
        return next();
    }

    const acceptedRoles = roles.map((role) => role.toLowerCase());

    const isAuthorized =  acceptedRoles.includes(userRole);

    if (isAuthorized) {
        return next();
    } else {
        apiError('Not Authorized', httpStatus.FORBIDDEN, res);
        throw Error();
    }
};

module.exports = authorization;
