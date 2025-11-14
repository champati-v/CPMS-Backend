const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },

  // store date as ISO date-only string (YYYY-MM-DD) for easy querying
  date: { type: String, required: true },
  // a normalized slot id or readable label e.g., "10:00-10:30"
  timeSlot: { type: String, required: true },

  status: { type: String, enum: ['pending', 'approved', 'cancelled', 'completed'], default: 'pending' },

  createdOn: { type: Date, default: Date.now }
});

// prevent double booking same doctor for same date+slot
appointmentSchema.index({ doctor: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
