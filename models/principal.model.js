const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/sequelize.helpers');

const Principal = sequelize.define(
    'principal',
    {
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
        type: {
            type: DataTypes.STRING,
            defaultValue: 'principal',
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    }
);

module.exports = Principal;
