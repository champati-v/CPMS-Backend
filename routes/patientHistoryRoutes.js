const express = require('express');
const patientHistoryRouter = express.Router();
const { savePatientHistory, getPatientHistories } = require('../controllers/patientHistoryController');
const { savePatientReport, getPatientReports } = require('../controllers/patientReportController');
const { authenticateToken } = require('../utils/jwtConfig');

patientHistoryRouter.post('/save-history', authenticateToken, savePatientHistory);
patientHistoryRouter.post('/save-report', authenticateToken, savePatientReport);
patientHistoryRouter.get('/get-history/:patientId', authenticateToken, getPatientHistories);
patientHistoryRouter.get('/get-reports/:patientId', authenticateToken, getPatientReports);

module.exports = patientHistoryRouter;