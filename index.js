const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./dbConnect')
const cors = require('cors');

app.use(
  cors({
    origin: "*",
  })
);

//import routes
const authRouter = require('./routes/authRoutes');
const patientHistoryRouter = require('./routes/patientHistoryRoutes');
const getPatientDetailsRouter = require('./routes/patientDetailsRoute');
const getAdminDetailsRouter = require('./routes/adminDetailsRoute');
const getDoctorDetailsRouter = require('./routes/doctorDetailsRoute');

//database connection
connectDB(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.use(express.json());

//auth routes
app.use('/api/auth', authRouter);

//get patient details
app.use('/api/patient', getPatientDetailsRouter);

//get Admin details
app.use('/api/admin', getAdminDetailsRouter);

//get doctor details
app.use('/api/doctor', getDoctorDetailsRouter);

//patient history routes
app.use('/api/patient', patientHistoryRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
