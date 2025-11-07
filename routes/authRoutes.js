const express = require('express');
const { handleSignup, handleLogin } = require('../controllers/authController');
const authRouter = express.Router();

//signup
authRouter.post("/signup", handleSignup);

//login
authRouter.post("/login", handleLogin);

module.exports = authRouter;