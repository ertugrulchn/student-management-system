const Principal = require('../models/principal.model');
const { getOneByQuery, create } = require('../services/base.service');
const { passwordToHash } = require('../helpers/password.helper');

const createPrincipal = async () => {
    const principal = await getOneByQuery(Principal, {
        email: process.env.PRINCIPAL_EMAIL,
    });

    if (principal) {
        return;
    }

    // Hash Password
    const password = await passwordToHash(process.env.PRINCIPAL_PASSWORD);

    const principalData = {
        firstName: process.env.PRINCIPAL_FIRST_NAME,
        lastName: process.env.PRINCIPAL_LAST_NAME,
        email: process.env.PRINCIPAL_EMAIL,
        password: password.hashedPassword,
    };

    await create(Principal, principalData);
};

module.exports = () => {
    createPrincipal();

    console.log('DB Seeded');
};
