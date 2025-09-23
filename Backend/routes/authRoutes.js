const express = require("express");
const { register, login, verifyEmail, forgotPassword, resetPassword,getAllUsers,updateUserProfile,deleteUserProfile,verifyResetOtp, adminUpdateUser} = require("../controller/authController");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");
const {protect} = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/verifymail", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-otp", resetPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.get("/users", getAllUsers);
router.put("/update-profile/:id", updateUserProfile);
router.delete("/delete-profile/:id", protect,deleteUserProfile);
router.put("/admin-update-user/:id",protect, adminUpdateUser);

module.exports = router;
