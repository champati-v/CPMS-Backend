const DoctorSchedule = require('../models/DoctorSchedule');
const Appointment = require('../models/Appointment');
const { format, parseISO, getDay } = require('date-fns');

async function getAvailableSlots(doctorId, dateStr) {
  // dateStr: 'YYYY-MM-DD'
  const date = parseISO(dateStr); // need date-fns
  const day = getDay(date); // 0-6

  const schedule = await DoctorSchedule.findOne({ doctor: doctorId, dayOfWeek: day });
  if (!schedule) return [];

  // build normalized slot labels like '10:00-10:30'
  const allSlots = schedule.slots.map(s => `${s.start}-${s.end}`);

  // get booked slots
  const appts = await Appointment.find({ doctor: doctorId, date: dateStr }).select('timeSlot -_id').lean();
  const booked = new Set(appts.map(a => a.timeSlot));

  const available = allSlots.filter(slot => !booked.has(slot));
  return available;
}

module.exports = { getAvailableSlots };
