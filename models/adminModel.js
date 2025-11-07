const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    fullName: { type: String, required: true },
    role: { type: String, default: 'admin' },
    address: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hospital: { type: String, required: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
    createdOn : { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model('Admin', adminSchema);
