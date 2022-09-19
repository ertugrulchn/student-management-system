const sequelize = require('./db-connection.loader');
const dbSeeder = require('./db-seeder.loader');

module.exports = () => {
    sequelize;
    dbSeeder();
};
