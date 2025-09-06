import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Message from "../models/Message.js";
import nodemailer from "nodemailer";

const router = express.Router();

// configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or another email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1️⃣ Save message to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2️⃣ Send email notification to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // admin email
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h3>New message received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error("Email failed:", emailErr);
    }

    // 3️⃣ Response to frontend
    res.json({ message: "Contact form received and email sent", data: newMessage });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save message or send email", error: err.message });
  }
});

export default router;
