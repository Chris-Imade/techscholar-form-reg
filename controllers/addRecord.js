const Record = require("../schemas/Record");
const nodemailer = require("nodemailer");
const emailBody = require("../templates/emailTemplates");

require("dotenv").config();

// Create a transporter with your email service configuration
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
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
    await transporter.sendMail({
      from: process.env.email,
      to: recordBody.email,
      subject: "SAC Registration",
      html: emailBody,
    });

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
