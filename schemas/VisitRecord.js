const mongoose = require("mongoose");

const VisitRecordSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  visits: { type: Number, default: 1 },
});

const VisitRecord = mongoose.model("VisitRecord", VisitRecordSchema);

module.exports = VisitRecord;
