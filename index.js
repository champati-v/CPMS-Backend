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
const userDataRouter = require('./routes/userDetailsRoute');
const appointmentRouter = require('./routes/appointmentRoute');
const addDepartmentRoute  = require('./routes/addDepartmentRoute');

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

//get user details routes
app.use('/api', userDataRouter);

//patient history routes
app.use('/api/patient', patientHistoryRouter);

//appointment routes
app.use('/api/appointments', appointmentRouter);

//add department routes
app.use('/api/department', addDepartmentRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
