const express = require("express");
const { register, login, verifyEmail, forgotPassword, resetPassword } = require("../controller/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset/:token", resetPassword);

module.exports = router;
