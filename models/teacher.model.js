const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/sequelize.helpers');
const Class = require('./class.model');

const Teacher = sequelize.define(
    'teacher',
    {
        identificationNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
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
        phoneNumber: {
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

Teacher.hasMany(Class, { as: 'classes' });
Class.belongsTo(Teacher, {
    foreignKey: 'teacherId',
    as: 'teachers',
});

module.exports = Teacher;
