require("dotenv").config(); // make sure this is at the top
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP Error:", error);
    } else {
        console.log("Server is ready to take messages");
    }
});
