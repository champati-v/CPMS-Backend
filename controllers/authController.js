const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Admin = require('../models/adminModel');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const QRCode = require('qrcode');

//for Patient Signup
async function handleSignup(req, res) {
    const { fullName, email, password, address, bloodGroup, phone, role, age, gender } = req.body;

  if (!fullName || !email || !password || !address || !bloodGroup || !phone || !age || !gender) {
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
    age,
    gender,
    role,
    password: hashedPassword,
  });
  await newPatient.save();

  //After patient data is saved, fetch the patient ID and genrate QR code
  const patientData = await Patient.findOne({ email: email });
  const qrData = {
    patientId: patientData._id,
    fullName: patientData.fullName,
    bloodGroup: patientData.bloodGroup,
  }

  const qrCodeImageUrl = await QRCode.toDataURL(JSON.stringify(qrData));
  console.log("Generated QR Code URL:", qrCodeImageUrl);

  // Update patient record with QR code URL
  newPatient.qrCodeUrl = qrCodeImageUrl;
  await newPatient.save();

  const accessToken = jwt.sign({ newPatient }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    message: "Patient created successfully!",
    accessToken,
    qrCodeImageUrl,
  });
}

//for doctor Signup
async function handleDoctorSignup(req, res) {
    const { fullName, email, password, address, bloodGroup, phone, role, speciality, hospital, experience, department } = req.body;
  
  if (!fullName || !email || !password || !address || !bloodGroup || !phone || !speciality || !hospital || !experience || !department) {
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
    department,
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
    return res.status(404).json({
      error: true,
      message: "Patient not found",
    });
  }

  const isMatch = await bcrypt.compare(password, patientInfo.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials ⚠️" });
  }

  const payload = {
    id: patientInfo._id,
    email: patientInfo.email,
    fullName: patientInfo.fullName,
    role: patientInfo.role,
  }

  if (patientInfo.email === email && isMatch) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.status(200).json({
      error: false,
      message: "Login successful!",
      patientInfo,
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
    return res
    .status(404)
    .json({
      error: true,
      message: "Doctor not found",
    });
  }

  const isMatch = await bcrypt.compare(password, doctorInfo.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials ⚠️" });
  }

  if (doctorInfo.email === email && isMatch) {
    
    const payload = {
      id: doctorInfo._id,
      email: doctorInfo.email,
      fullName: doctorInfo.fullName,
      role: doctorInfo.role,
      speciality: doctorInfo.speciality,
      hospital: doctorInfo.hospital,
      experience: doctorInfo.experience,
    }

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res
    .status(200)
    .json({
      error: false,
      message: "Doctor login successful!",
      doctorInfo,
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
    return res
    .status(404)
    .json({
      error: true,
      message: "Admin not found",
    });
  }

  const isMatch = await bcrypt.compare(password, adminInfo.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials ⚠️" });
  }

  if (adminInfo.email === email && isMatch) {
    const payload = {
      id: adminInfo._id,
      email: adminInfo.email,
      fullName: adminInfo.fullName,
      role: adminInfo.role,
      hospital: adminInfo.hospital,
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res
    .status(200)
    .json({
      error: false,
      message: "Admin login successful!",
      adminInfo,
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