const express = require("express");
const { register, login, verifyEmail, forgotPassword, resetPassword,getAllUsers,updateUserProfile,deleteUserProfile,verifyResetOtp} = require("../controller/authController");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

router.post("/register", register);
router.post("/login", login);
router.post("/verifymail", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-otp", resetPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.get("/users", getAllUsers);
router.put("/update-profile/:id", updateUserProfile);
router.delete("/delete-profile/:id", deleteUserProfile);
router.get("/test-email", async (req, res) => {
    console.log("✅ Test email route hit");
    await sendEmail("vibhavbhartiya13@email.com", "Test", "<h1>Hello</h1>");
    res.send("Email attempted");
});
module.exports = router;
