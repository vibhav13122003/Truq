const express = require("express");
const { register, login, verifyEmail, forgotPassword, resetPassword,getAllUsers } = require("../controller/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifymail", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-otp", resetPassword);
router.get("/users", getAllUsers);
module.exports = router;
