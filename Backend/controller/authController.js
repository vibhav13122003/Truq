const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const verifyLink = `${process.env.CLIENT_URL}/api/auth/verify/${token}`;

        // Send verification email
        await sendEmail(user.email, "Verify Your Email", `
      <h2>Welcome ${user.name}</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verifyLink}">Verify Email</a>
    `);

        res.json({ msg: "Registration successful, check email to verify account" });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ msg: "Server error" });
    }
      
    
};
exports.verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).json({ msg: "Invalid token" });

        user.isVerified = true;
        await user.save();

        res.json({ msg: "Email verified successfully!" });
    } catch (err) {
        res.status(400).json({ msg: "Invalid or expired token" });
    }
};
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });
 vbgh
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins
        await user.save();

        const resetLink = `${process.env.CLIENT_URL}/api/auth/reset/${resetToken}`;

        await sendEmail(user.email, "Password Reset", `
      <h2>Hello ${user.name}</h2>
      <p>Click below to reset your password (valid for 15 minutes):</p>
      <a href="${resetLink}">Reset Password</a>
    `);

        res.json({ msg: "Password reset link sent to email" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user || user.resetPasswordToken !== token || user.resetPasswordExpire < Date.now()) {
            return res.status(400).json({ msg: "Invalid or expired token" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.json({ msg: "Password reset successful" });
    } catch (err) {
        res.status(400).json({ msg: "Invalid or expired token" });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.cookie("token", token, { httpOnly: true });
        res.json({ msg: "Login successful", token });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
