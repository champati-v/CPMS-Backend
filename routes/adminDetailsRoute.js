const express = require('express');
const getAdminDetailsRouter = express.Router();
const {getAdminDetails} = require('../controllers/adminDataController');
const {authenticateToken} = require('../utils/jwtConfig');

getAdminDetailsRouter.get('/get-admin-details', authenticateToken, getAdminDetails);

module.exports = getAdminDetailsRouter;