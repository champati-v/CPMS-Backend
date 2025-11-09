const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientHistorySchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  patientName: { type: String },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  doctorName: { type: String },
  visitDate: { type: Date, default: Date.now },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  followUpDate: { type: Date },
});

module.exports = mongoose.model('PatientHistory', patientHistorySchema);