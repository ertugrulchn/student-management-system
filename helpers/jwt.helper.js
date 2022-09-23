const jwt = require('jsonwebtoken');

const createLoginToken = (user, res) => {
    const token = jwt.sign(
        {
            id: user.dataValues.id,
            first_name: user.dataValues.first_name,
            last_name: user.dataValues.last_name,
            email: user.dataValues.email,
            type: user.dataValues.type,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '24h',
        }
    );
    res.header('token', token);

    return token;
};

module.exports = { createLoginToken };
