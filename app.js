const express = require('express');
require('express-async-errors');
const cors = require('cors');
const configs = require('./configs');
const loaders = require('./loaders');
const routes = require('./routes');
const sequelize = require('./helpers/sequelize.helpers');

configs();
loaders();

const app = express();
app.use(express.json());

sequelize.sync();

app.use(
    cors({
        origin: '*',
    })
);

app.use('/principal', routes.principal);
app.use('/teacher', routes.teacher);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`App listening on port http://localhost:${PORT}`)
);
