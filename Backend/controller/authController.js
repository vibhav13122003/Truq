const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");
const Otp = require("../model/OtpModel");
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d", // adjust expiry as you want
    });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword, isVerified: false });
        await user.save();

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.create({
            email,
            otp,
            otpExpire: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
        });

        // Send verification email
        await sendEmail(
            email,
            "Verify Your Email",
            `<h2>Welcome ${name}</h2>
             <p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`
        );

        // Generate JWT
        const token = generateToken(user._id);
        console.log("Generated Token:", token); // Debug

        res.status(201).json({
            msg: "Registration successful, check email for OTP",
            token,               
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
            }
        });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const record = await Otp.findOne({ email }).sort({ createdAt: -1 });
        if (!record) return res.status(400).json({ msg: "OTP not found" });
        if (record.otpExpire < Date.now())
        {
            await User.findOneAndDelete({ email, isVerified: false });
            return res.status(400).json({ msg: "OTP expired" });

        }
        if (record.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

        await User.updateOne({ email }, { isVerified: true });
        await Otp.deleteMany({ email });
        res.json({ msg: "Email verified successfully!" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.create({
            email,
            otp,
            otpExpire: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
        });

        await sendEmail(email, "Password Reset OTP", `
      <h2>Hello ${user.name}</h2>
      <p>Your OTP for password reset is <b>${otp}</b>. It expires in 10 minutes.</p>
    `);

        res.json({ msg: "OTP sent to email for password reset" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
exports.verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const record = await Otp.findOne({ email }).sort({ createdAt: -1 });

        if (!record) return res.status(400).json({ msg: "OTP not found" });
        if (record.otpExpire < Date.now()) return res.status(400).json({ msg: "OTP expired" });
        if (record.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

        
        await Otp.deleteMany({ email });

       
        const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });

        res.json({ msg: "OTP verified, you can now reset password", resetToken });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { resetToken, password } = req.body;

        // Verify reset token
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ msg: "Password reset successful" });
    } catch (err) {
        console.error("Reset error:", err);
        res.status(500).json({ msg: "Invalid or expired reset token" });
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
            expiresIn: "7d",
        });

        res.cookie("token", token, { httpOnly: true });
        res.json({ msg: "Login successful", token });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};



exports.getAllUsers=async(req,res)=>{
    try{
        const users=await User.find()
        res.json(users);
    }catch(err){
        res.status(500).json({msg:"Server error"});
    }
}
// ====================== UPDATE USER ======================
exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.user.id; // comes from auth middleware

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (name) user.name = name;
        if (email) user.email = email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.json({
            msg: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
            }
        });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};


// ====================== DELETE USER ======================
exports.deleteUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // comes from auth middleware

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        await User.findByIdAndDelete(userId);

        res.clearCookie("token"); // optional: log out after delete
        res.json({ msg: "User deleted successfully" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};
