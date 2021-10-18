const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/user/register', userController.create_user);

router.post('/user/login', userController.login);

router.get('/user/logout', userController.logout);

router.get('/user/loggedIn', userController.logged_in);

module.exports = router;