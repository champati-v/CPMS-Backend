const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Department', departmentSchema);
