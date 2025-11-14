const express = require('express');
const patientHistoryRouter = express.Router();
const { savePatientHistory, getPatientHistories, doctorGetPatientHistories } = require('../controllers/patientHistoryController');
const { savePatientReport, getPatientReports, doctorGetPatientReports } = require('../controllers/patientReportController');
const { authenticateToken } = require('../utils/jwtConfig');

patientHistoryRouter.post('/save-history', authenticateToken, savePatientHistory);
patientHistoryRouter.post('/save-report', authenticateToken, savePatientReport);
patientHistoryRouter.get('/get-history', authenticateToken, getPatientHistories);
patientHistoryRouter.get('/get-reports', authenticateToken, getPatientReports);
patientHistoryRouter.post('/doctor-get-history', authenticateToken, doctorGetPatientHistories);
patientHistoryRouter.post('/doctor-get-report', authenticateToken, doctorGetPatientReports);



module.exports = patientHistoryRouter;