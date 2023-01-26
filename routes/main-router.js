const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const homeController = require('../controllers/home-controller');
const postsController = require('../controllers/posts-controller');
const { ensureAuth } = require('../middleware/auth');

//Main routes

router.get('/', homeController.getIndex);

router.get('/profile', ensureAuth, postsController.getProfile);

router.get('/feed', ensureAuth, postsController.getFeed);

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/logout', authController.logout);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

module.exports = router