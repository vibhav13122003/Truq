// models/Otp.js
const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    otpExpire: { type: Date, required: true },
}, { timestamps: true });

// TTL Index (MongoDB will auto-delete after otpExpire time)
OtpSchema.index({ otpExpire: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Otp", OtpSchema);
