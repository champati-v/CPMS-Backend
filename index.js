const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const authRouter = require('./routes/authRoutes');
const connectDB = require('./dbConnect')
const cors = require('cors');

app.use(
  cors({
    origin: "*",
  })
);

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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
