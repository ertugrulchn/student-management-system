// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = async (message, type, res) => {
    return res.status(type).json({
        message: message,
        isSuccess: false,
    });
};
