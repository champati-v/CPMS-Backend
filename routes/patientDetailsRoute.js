const express = require('express');
const getPatientDetailsRouter = express.Router();
const { getPatientDetails } = require('../controllers/patientDataController');
const { authenticateToken } = require('../utils/jwtConfig');

getPatientDetailsRouter.get('/get-patient-details', authenticateToken, getPatientDetails);

module.exports = getPatientDetailsRouter;