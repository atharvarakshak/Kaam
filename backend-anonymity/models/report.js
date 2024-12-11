import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  encryptedMessage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Report = mongoose.model("Report", reportSchema);
