const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientReportSchema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    patientName: { type: String },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    doctorName: { type: String },
    reportDate: { type: Date, default: Date.now },
    reportLink: { type: String, required: true },
    diagnosis: { type: String, required: true },
    remarks: { type: String, required: true }
})

module.exports = mongoose.model('PatientReport', patientReportSchema);