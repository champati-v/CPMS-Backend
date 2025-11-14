const mongoose = require('mongoose');
const { Schema } = mongoose;

const slotSchema = new Schema({
    start: { type: String, required: true }, // "10:00"
    end: { type: String, required: true }    // "10:30"
}, { _id: false });

const doctorScheduleSchema = new Schema({
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true },
  // dayOfWeek: 0 (Sun) - 6 (Sat)
  dayOfWeek: { type: Number, min: 0, max: 6, required: true },
  slots: [slotSchema],
  // timezone optional to convert slots correctly
  timezone: { type: String, default: 'UTC' }
});

doctorScheduleSchema.index({ doctor: 1, dayOfWeek: 1 }, { unique: true });

module.exports = mongoose.model('DoctorSchedule', doctorScheduleSchema);
