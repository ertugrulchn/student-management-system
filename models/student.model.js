const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/sequelize.helpers');
const Class = require('./class.model');

const Student = sequelize.define(
    'student',
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
            defaultValue: 'student',
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    }
);

Class.hasMany(Student, { as: 'students' });
Student.belongsTo(Class, {
    foreignKey: 'classId',
    as: 'classes',
});

module.exports = Student;
