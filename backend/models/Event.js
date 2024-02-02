const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  cover: String,
  startDate: { type: Date },
  startTime: String,
  description: String,
  type: { type: String, enum: ["physical", "virtual"], required: true },
  universityLocation: String,
  state: String,
  placeName: String,
  locationLink: String,
  locationDescription: String,
  virtualApp: String,
  virtualLink: String,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
