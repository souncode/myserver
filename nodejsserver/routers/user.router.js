const router = require('express').Router();

const UserController = require('../controller/user.controller');

router.post('/adduser', UserController.addUser);

module.exports = router;