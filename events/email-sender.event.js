// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const eventEmitter = require('./event-emitter.event');

module.exports = () => {
    eventEmitter.on('send_email', (emailData) => {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST, // For Gmail: smtp.gmail.com
            port: process.env.EMAIL_PORT, // For Gmail: 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        if (emailData.template) {
            transporter.use(
                'compile',
                hbs({
                    viewEngine: {
                        extName: '.hbs',
                        partialsDir: 'templates/email',
                        defaultLayout: false,
                    },
                    viewPath: 'templates/email',
                    extName: '.hbs',
                })
            );
        }

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            ...emailData,
        });
    });
};
