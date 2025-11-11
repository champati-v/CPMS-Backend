const Patient = require('../models/patientModel');

async function getPatientDetails(req, res) {
    const patientId = req.user.id;

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({
                error: true,
                message: "Patient not found ⚠️",
            });
        } 
        
        //payload
        const patientInfo = {
            role: patient.role,
            fullName: patient.fullName,
            email: patient.email,
            phone: patient.phone,
            age: patient.age,
            bloodGroup: patient.bloodGroup,
            phone: patient.phone,
            address: patient.address,
        }

        return res.status(200).json({
            error: false,
            message: "Patient details retrieved successfully",
            patientInfo
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: `An error occurred while retrieving patient details. ${error.message}`,
        });
    }
}

module.exports = { getPatientDetails };