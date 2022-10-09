const express = require('express');
const controller = require('../controllers/project.controller');
const authenticate = require('../middlewares/authentication.middleware');
const router = express.Router();

router.route('/').get(authenticate, controller.getAllProjects);

module.exports = router;
