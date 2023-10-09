import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const gmailTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export default gmailTransport;