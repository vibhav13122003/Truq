const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("../config/db");
const authRoutes = require("../routes/authRoutes");
const profileRoutes = require("../routes/profileRoutes");
const hazardRoutes = require("../routes/hazardRoute");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
    // Setting origin to 'true' reflects the request origin.
    // This is a flexible way to allow any origin to make credentialed requests,
    // effectively allowing all origins for this configuration.
    origin: true,
    // This is essential for sending cookies or authorization headers.
    credentials: true,
    // Explicitly allow the methods your frontend will use.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // Explicitly allow the headers your frontend sends.
    allowedHeaders: 'Content-Type,Authorization',
};

// Use the configured CORS options
app.use(cors(corsOptions));
// ... existing code ...
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/hazards", hazardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});


// Export instead of app.listen
module.exports = app;
