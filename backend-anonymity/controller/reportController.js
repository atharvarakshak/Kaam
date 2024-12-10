import crypto from "crypto";
import { Report } from "../models/report.js";

// Helper function to encrypt messages
const encryptMessage = (message, secret) => {
  const cipher = crypto.createCipher("aes-256-cbc", secret);
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};
    
// Submit a new report
export const submitReport = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Generate a random secret key for encryption
    const secret = crypto.randomBytes(16).toString("hex");
    const encryptedMessage = encryptMessage(message, secret);

    // Save the report to the database
    const newReport = new Report({ encryptedMessage });
    await newReport.save();

    res.status(201).json({ success: true, message: "Report submitted anonymously!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit report" });
  }
};

// Get all reports (for admin or testing purposes)
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};
