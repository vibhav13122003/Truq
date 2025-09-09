const express = require("express");
const { register, login, verifyEmail, forgotPassword, resetPassword,getAllUsers } = require("../controller/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset/:token", resetPassword);
router.get("/users", getAllUsers);
module.exports = router;
