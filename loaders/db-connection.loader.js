const sequelize = require('../helpers/sequelize.helpers');

sequelize
    .authenticate()
    .then(() => {
        console.log('DB Connection Successfully');
    })
    .catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });

module.exports = {
    sequelize,
};
