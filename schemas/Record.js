const mongoose = require("mongoose");

const RecordSchema = mongoose.Schema({
  school_name: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  position: String,
  entered_position: String,
  school_sections: [String],
  use_sms: String,
  sms_name: String,
  challenges: [String],
  indicated_challenge: String,
  performance_tracking_mode: String,
  indicated_performance_tracking_mode: String,
  specific_features: [String],
  interested_learning_area: String,
  indicated_interest: String,
  preferred_meeting_arena: String,
  interested_in_demo: String,
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  lga: String,
});

const Record = mongoose.model("RecordModel", RecordSchema);

module.exports = Record;
