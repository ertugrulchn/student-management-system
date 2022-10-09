const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/sequelize.helpers');
const Teacher = require('./teacher.model');

const Project = sequelize.define(
    'project',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    }
);

Project.belongsTo(Teacher, {
    as: 'teachers',
    foreignKey: 'teacherId',
    constraints: false,
});

module.exports = Project;
