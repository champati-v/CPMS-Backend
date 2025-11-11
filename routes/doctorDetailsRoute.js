const express = require('express');
const getDoctorDetailsRouter = express.Router();
const {authenticateToken} = require('../utils/jwtConfig');
const {getDoctorDetails} = require('../controllers/doctorDataController');

getDoctorDetailsRouter.get('/get-doctor-details', authenticateToken, getDoctorDetails);

module.exports = getDoctorDetailsRouter;