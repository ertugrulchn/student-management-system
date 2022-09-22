// Copyright (c) 2022 Ertuğrul Emre Cihan
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/sequelize.helpers');

const Teacher = sequelize.define(
    'teacher',
    {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: 'teacher',
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    }
);

module.exports = Teacher;
