const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const commentsController = require('../controllers/comments-controller');
const { ensureAuth } = require('../middleware/auth');

router.post('/createComment/:id', commentsController.createComment);

module.exports = router;