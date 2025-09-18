const express = require("express");
const { register, login, verifyEmail, forgotPassword, resetPassword,getAllUsers,updateUserProfile,deleteUserProfile } = require("../controller/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifymail", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-otp", resetPassword);
router.get("/users", getAllUsers);
router.put("/update-profile/:id", updateUserProfile);
router.delete("/delete-profile/:id", deleteUserProfile);
module.exports = router;
