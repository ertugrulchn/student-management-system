const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/sequelize.helpers');

const Student = sequelize.define(
    'student',
    {
        identification_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
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
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: 'student',
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    }
);

module.exports = Student;
