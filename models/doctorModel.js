const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    fullName: { type: String, required: true },
    role: { type: String, default: 'doctor' },
    address: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    speciality: { type: String, required: true },
    hospital: { type: String, required: true },
    experience: { type: String, required: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
    department: { type: mongoose.Types.ObjectId, ref: 'Department', required: true },
    createdOn : { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model('Doctor', doctorSchema);
