const { Patient } = require('../models/patientModel')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");


async function handleSignup(req, res) {
    const { fullName, email, password, address, bloodGroup, phone } = req.body;

  if (!fullName || !email || !password || !address || !bloodGroup || !phone) {
    return res
      .status(400)
      .json({ error: true, message: "Please fill in all details" });
  }

  const isPatient = await Patient.findOne({ email: email });

  if (isPatient) {
    return res.status(401).json({
      error: true,
      message: "Patient already exists! Please login.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    fullName,
    email,
    address,
    bloodGroup,
    phone,
    password: hashedPassword,
  });
  await Patient.save();

  const accessToken = jwt.sign({ Patient }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    message: "Patient created successfully!",
    accessToken,
  });
}

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
    return res.status(400).json({ message: "Invalid credentials" });
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
      message: "Invalid credentials",
    });
  }
}

module.exports = { handleSignup, handleLogin };