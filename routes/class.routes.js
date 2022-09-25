const express = require('express');
const classController = require('../controllers/class.controller');
const authenticate = require('../middlewares/authentication.middleware');
const router = express.Router();

router.route('/').get(authenticate, classController.getAllClass);

module.exports = router;
