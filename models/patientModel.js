const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    fullName: { type: String, required: true },
    role: { type: String, default: 'patient' },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
    qrCodeUrl: { type: String },
    createdOn : { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model('Patient', patientSchema);
