const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/sequelize.helpers');

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

Teacher.associate = (models) => {
    Teacher.hasOne(models.Lesson);
};

module.exports = Teacher;
