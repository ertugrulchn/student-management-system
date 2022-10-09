const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/sequelize.helpers');
const Teacher = require('./teacher.model');

const Lesson = sequelize.define(
    'lesson',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    }
);

Lesson.belongsTo(Teacher, {
    as: 'teachers',
    foreignKey: 'teacherId',
    constraints: false,
});

module.exports = Lesson;
