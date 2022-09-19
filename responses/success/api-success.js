// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = async (message, datas, isSuccess, type, res) => {
    return res.status(type).json({
        message: message,
        data: datas,
        isSuccess: true,
    });
};
