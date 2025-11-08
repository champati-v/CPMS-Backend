const express = require('express');
const { handleSignup, handleDoctorSignup, handleAdminSignup, handleLogin, handleDoctorLogin, handleAdminLogin } = require('../controllers/authController');
const authRouter = express.Router();

//patient signup
authRouter.post("/signup", handleSignup);

//doctor signup
authRouter.post("/doctorSignup", handleDoctorSignup);

//admin signup
authRouter.post("/adminSignup", handleAdminSignup);

//patient login
authRouter.post("/login", handleLogin);

//doctor login
authRouter.post("/doctorLogin", handleDoctorLogin);

//admin login
authRouter.post("/adminLogin", handleAdminLogin);

module.exports = authRouter;