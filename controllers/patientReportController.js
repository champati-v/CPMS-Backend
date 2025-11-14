const patientReportModel = require('../models/patientReportModel');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');

async function savePatientReport( req,res ){
    const { patientId, doctorId, reportDate, reportLink, diagnosis, remarks } = req.body;

    try{
        const isPatient = await Patient.findById(patientId);
        if(!isPatient){
            return res.status(404).json({
                error: true,
                message: "Patient not found ⚠️",
            });
        }

        const isDoctor = await Doctor.findById(doctorId);
        if(!isDoctor){
            return res.status(404).json({
                error: true,
                message: "Doctor not found ⚠️",
            });
        }

        const newReport = new patientReportModel({
            patientId,
            patientName: isPatient.name,
            doctorId,
            doctorName: isDoctor.name,
            reportDate,
            reportLink,
            diagnosis,
            remarks
        });

        await newReport.save();

        return res.status(201).json({
            error: false,
            message: "Patient report saved successfully ✅",
            data: newReport
        });
    } catch (error) {
        console.error("Error saving patient report:", error);
        return res.status(500).json({
            error: true,
            message: "Internal server error ⚠️"
        });
    }
}

async function getPatientReports( req,res ){
    const patientId = req.user.id;

    try{
        const patientReports = await patientReportModel.find({ patientId });

        return res.status(200).json({
            error: false,
            message: "Patient reports retrieved successfully",
            data: patientReports
        });
    } catch (error) {
        console.error("Error retrieving patient reports:", error);
        return res.status(500).json({
            error: true,
            message: "Internal server error ⚠️"
        });
    }
}

async function doctorGetPatientReports(req, res){
    const { patientId } = req.body;

     try{
        const patientReports = await patientReportModel.find({ patientId });

        return res.status(200).json({
            error: false,
            message: "Patient reports retrieved successfully",
            data: patientReports
        });
    } catch (error) {
        console.error("Error retrieving patient reports:", error);
        return res.status(500).json({
            error: true,
            message: "Internal server error ⚠️"
        });
    }
}

module.exports = { savePatientReport , getPatientReports, doctorGetPatientReports};
