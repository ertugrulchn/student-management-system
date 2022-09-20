// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const httpStatus = require('http-status');
const apiError = require('../responses/error/api-error');

const bodyValidator = (schema) => (req, res, next) => {
    const options = {
        errors: { wrap: { label: "'" } },
        abortEarly: false,
    };

    if (
        Object.keys(req.body || {}).length === 0 &&
        Object.keys(req.files || {}).length === 0
    ) {
        apiError('Request body must not be empty', httpStatus.BAD_REQUEST, res);
        throw Error();
    }

    const { error } = schema.validate(req.body, options);

    if (error) {
        const errorMessage = error.details
            .map((detail) => detail.message)
            .join(', ');
        apiError(errorMessage, httpStatus.BAD_REQUEST, res);
        throw Error();
    }

    next();
};

module.exports = bodyValidator;
