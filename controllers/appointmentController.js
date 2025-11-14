const mongoose = require('mongoose');
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');

async function getBookedSlots(req, res) {
  const { doctor } = req.query;
  const { date } = req.query; // YYYY-MM-DD

  if (!doctor || !date) return res.status(400).json({ message: 'doctor and date required' });

  const appointments = await Appointment.find({ doctor, date }).select('timeSlot -_id').lean();
  const booked = appointments.map(a => a.timeSlot);
  res.json({ bookedSlots: booked });
}

async function getPatientAppointments(req, res) {
  const patientId = req.user.id;

  if (!patientId) {
    return res.status(400).json({ message: "patientId is required" });
  }

  try {
    const appointments = await Appointment.find({ patient: patientId })
      .populate("doctor", "fullName speciality email phone imageUrl")
      .populate("department", "name")
      .sort({ date: 1 });

    res.json({
      count: appointments.length,
      appointments,
    });
  } catch (err) {
    console.error("Error fetching patient appointments:", err);
    res.status(500).json({ message: "Unable to fetch patient appointments" });
  }
}

async function getDoctorAppointments(req, res) {
  const doctorId  = req.user.id;

  if (!doctorId) {
    return res.status(400).json({ message: "doctorId is required" });
  }

  try {
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "fullName email phone imageUrl")
      .populate("department", "name")
      .sort({ date: 1 });

    res.json({
      count: appointments.length,
      appointments,
    });
  } catch (err) {
    console.error("Error fetching doctor appointments:", err);
    res.status(500).json({ message: "Unable to fetch doctor appointments" });
  }
}


async function createAppointment(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { patientId, doctorId, departmentId, date, timeSlot } = req.body;
    if (!patientId || !doctorId || !date || !timeSlot || !departmentId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Missing fields' });
    }

    // Optional: validate doctor/patient existence
    const doctor = await Doctor.findById(doctorId).session(session);
    if (!doctor) throw { status: 404, message: 'Doctor not found' };

    // Check if appointment exists (double booking)
    const existing = await Appointment.findOne({ doctor: doctorId, date, timeSlot }).session(session);
    if (existing) {
      throw { status: 409, message: 'Time slot already booked' };
    }

    // Create appointment
    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      department: departmentId,
      date,
      timeSlot,
      status: 'pending'
    });

    await appointment.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    if (err && err.status) return res.status(err.status).json({ message: err.message });
    // handle mongoose unique index race fallback (if transactions not used or race happened)
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Time slot already booked' });
    }
    console.error(err);
    res.status(500).json({ message: 'Booking failed' });
  }
}

module.exports = { getBookedSlots, createAppointment, getPatientAppointments, getDoctorAppointments };
