const express = require('express');
const userDataRouter = express.Router();
const { getUserData } = require('../controllers/userDataController');
const { authenticateToken } = require('../utils/jwtConfig');

userDataRouter.get('/user/details', authenticateToken, getUserData);

module.exports = userDataRouter;