const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Admin = require('../models/adminModel');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//for Patient Signup
async function handleSignup(req, res) {
    const { fullName, email, password, address, bloodGroup, phone, role } = req.body;

  if (!fullName || !email || !password || !address || !bloodGroup || !phone) {
    return res
      .status(400)
      .json({ error: true, message: "Please fill in all details ⚠️" });
  }

  const isPatient = await Patient.findOne({ email: email });

  if (isPatient) {
    return res.status(401).json({
      error: true,
      message: "Patient already exists! Please login.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newPatient = new Patient({
    fullName,
    email,
    address,
    bloodGroup,
    phone,
    role,
    password: hashedPassword,
  });
  await newPatient.save();

  const accessToken = jwt.sign({ newPatient }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    message: "Patient created successfully!",
    accessToken,
  });
}

//for doctor Signup
async function handleDoctorSignup(req, res) {
    const { fullName, email, password, address, bloodGroup, phone, role, speciality, hospital, experience } = req.body;

  if (!fullName || !email || !password || !address || !bloodGroup || !phone || !speciality || !hospital || !experience) {
    return res
      .status(400)
      .json({ error: true, message: "Please fill in all details ⚠️" });
  }

  const isDoctor = await Doctor.findOne({ email: email });

  if (isDoctor) {
    return res.status(401).json({
      error: true,
      message: "Doctor already exists! Please login.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newDoctor = new Doctor({
    fullName,
    email,
    address,
    bloodGroup,
    phone,
    role,
    password: hashedPassword,
    speciality,
    hospital,
    experience,
  });
  await newDoctor.save();

  const accessToken = jwt.sign({ newDoctor }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    message: "Doctor created successfully!",
    accessToken,
  });
}

//for admin signup
async function handleAdminSignup(req, res) {
    const { fullName, email, password, address, bloodGroup, phone, role, hospital } = req.body;

  if (!fullName || !email || !password || !address || !bloodGroup || !phone || !hospital) {
    return res
      .status(400)
      .json({ error: true, message: "Please fill in all details ⚠️" });
  }

  const isAdmin = await Admin.findOne({ email: email });

  if (isAdmin) {
    return res.status(401).json({
      error: true,
      message: "Admin already exists! Please login.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newAdmin = new Admin({
    fullName,
    email,
    address,
    bloodGroup,
    phone,
    role,
    password: hashedPassword,
    hospital,
  });
  await newAdmin.save();

  const accessToken = jwt.sign({ newAdmin }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    message: "Admin created successfully!",
    accessToken,
  });
}

//for Patient Login
async function handleLogin(req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const patientInfo = await Patient.findOne({ email: email });

  if (!patientInfo) {
    return res.json({
      error: true,
      message: "Patient not found",
    });
  }

  const isMatch = await bcrypt.compare(password, patientInfo.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials ⚠️" });
  }

  if (patientInfo.email === email && isMatch) {
    const patient = { patient: patientInfo };
    const accessToken = jwt.sign(patient, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.json({
      error: false,
      message: "Login successful!",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials ⚠️",
    });
  }
}

//for doctor login
async function handleDoctorLogin(req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const doctorInfo = await Doctor.findOne({ email: email });

  if (!doctorInfo) {
    return res.json({
      error: true,
      message: "Doctor not found",
    });
  }

  const isMatch = await bcrypt.compare(password, doctorInfo.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials ⚠️" });
  }

  if (doctorInfo.email === email && isMatch) {
    const doctor = { doctor: doctorInfo };
    const accessToken = jwt.sign(doctor, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.json({
      error: false,
      message: "Doctor login successful!",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials ⚠️",
    });
  }
}

//admin login
async function handleAdminLogin(req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const adminInfo = await Admin.findOne({ email: email });

  if (!adminInfo) {
    return res.json({
      error: true,
      message: "Admin not found",
    });
  }

  const isMatch = await bcrypt.compare(password, adminInfo.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials ⚠️" });
  }

  if (adminInfo.email === email && isMatch) {
    const admin = { admin: adminInfo };
    const accessToken = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.json({
      error: false,
      message: "Admin login successful!",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials ⚠️",
    });
  }
}

module.exports = { handleSignup, handleLogin, handleDoctorSignup, handleAdminSignup, handleDoctorLogin, handleAdminLogin };