const Record = require("../schemas/Record");
const nodemailer = require("nodemailer");
const emailBody = require("../templates/emailTemplates");

require("dotenv").config();

// Create a transporter with your email service configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.emailPassword,
  },
});

const addRecord = async (req, res) => {
  try {

    const recordBody = req.body;
    const newRecord = new Record(recordBody);
    const savedRecord = await newRecord.save();

    // Send email using Nodemailer
    const info = await transporter.sendMail({
      from: process.env.email,
      to: recordBody.email,
      subject: "SAC Registration",
      html: emailBody,
    });

    console.log("Email sent:", info.messageId);

    res.status(201).json({
      message: "Record added successfully",
      data: savedRecord,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding record",
      error: error.message,
    });
  }
};

module.exports = addRecord;
