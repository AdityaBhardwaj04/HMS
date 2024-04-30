// models/Patient.js
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Make sure this aligns with calculateNextPID
  patientName: { type: String, required: true },
  patientAge: { type: Number, required: true },
  patientAddress: { type: String, required: true },
  paymentStatus: { type: String, required: true, enum: ["paid", "unpaid"] },
});

module.exports = mongoose.model("Patient", patientSchema);
