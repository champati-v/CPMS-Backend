const express = require('express');
const appointmentRouter = express.Router();
const { getPatientAppointments, getDoctorAppointments, createAppointment } = require('../controllers/appointmentController');
const authenticateToken = require('../utils/jwtConfig').authenticateToken;

appointmentRouter.get('/patient-appointments', authenticateToken, getPatientAppointments);
appointmentRouter.get('/doctor-appointments', authenticateToken, getDoctorAppointments);
appointmentRouter.post('/create', authenticateToken, createAppointment);

module.exports = appointmentRouter;