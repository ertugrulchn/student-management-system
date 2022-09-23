// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const emailSender = require('./email-sender.event');

module.exports = () => {
    emailSender();
};
