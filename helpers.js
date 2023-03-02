// Dependencies
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: { rejectUnauthorized: false },
        });

        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
        console.error(error);
    }
};

// Export module
module.exports = { sendEmail };
