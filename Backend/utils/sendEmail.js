const nodemailer = require("nodemailer");

console.log("EMAIL USER at runtime:", process.env.EMAIL_USER);

const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, 
            },
        });

        await transporter.sendMail({
            from: `"Truq" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("📩 Email sent to:", to);
    } catch (err) {
        console.error("❌ Email error:", err);
    }
};



module.exports = sendEmail;
