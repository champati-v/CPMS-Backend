const patientHistory = require('../models/patientHistoryModel');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');

async function savePatientHistory(req, res) {
    const { patientId, doctorId, visitDate, symptoms, diagnosis, treatment, followUpDate } = req.body;

    try {
        const isPatient = await Patient.findById(patientId);
        if (!isPatient) {
            return res.status(404).json({
                error: true,
                message: "Patient not found ⚠️",
            });
        }

        const isDoctor = await Doctor.findById(doctorId);
        if (!isDoctor) {
            return res.status(404).json({
                error: true,
                message: "Doctor not found ⚠️",
            });
        }

        if(isPatient){
            console.log("Patient found:", isPatient.fullName);
        }

        const newHistory = new patientHistory({
            patientId,
            patientName: isPatient.fullName,
            doctorId,
            doctorName: isDoctor.fullName,
            visitDate,
            symptoms,
            diagnosis,
            treatment,
            followUpDate
        });
        await newHistory.save();

        return res.status(201).json({
            error: false,
            message: "Patient history recorded successfully!",
            data: newHistory
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: `An error occurred while saving patient history. ${error.message}`,
        });
    }
}

async function getPatientHistories(req, res) {
    const patientId = req.user.id;

    try{
        const patientHistories = await patientHistory.find({ patientId });
        return res.status(200).json({
            error: false,
            message: "Patient histories retrieved successfully",
            data: patientHistories
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: `An error occurred while retrieving patient histories. ${error.message}`,
        });
    }
}

async function doctorGetPatientHistories(req, res) {
    const {patientId} = req.body;
    try{
        const patientHistories = await patientHistory.find({ patientId });
        return res.status(200).json({
            error: false,
            message: "Patient histories retrieved successfully",
            data: patientHistories
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: `An error occurred while retrieving patient histories. ${error.message}`,
        });
    }
}

module.exports = { savePatientHistory, getPatientHistories, doctorGetPatientHistories };