const express = require('express');
const lessonController = require('../controllers/lesson.controller');
const authenticate = require('../middlewares/authentication.middleware');
const router = express.Router();

router.route('/').get(authenticate, lessonController.getAllLesson);

module.exports = router;
