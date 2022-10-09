const express = require('express');
require('express-async-errors');
const cors = require('cors');
const configs = require('./configs');
const loaders = require('./loaders');
const events = require('./events');
const routes = require('./routes');
const sequelize = require('./helpers/sequelize.helpers');

configs();
loaders();
events();

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
app.use('/student', routes.student);
app.use('/class', routes.class);
app.use('/lesson', routes.lessons);
app.use('/project', routes.project);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`App listening on port http://localhost:${PORT}`)
);
