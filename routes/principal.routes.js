const express = require('express');
const principalController = require('../controllers/principal.controller');
const router = express.Router();

router.route('/login').post(principalController.login);

module.exports = router;
