const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/sequelize.helpers');

const Class = sequelize.define(
    'class',
    {
        className: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    }
);

module.exports = Class;
