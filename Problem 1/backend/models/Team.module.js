const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  team_name: { type: String, required: true },
});

const TeamModel = mongoose.model("teamdetails", TeamSchema);

module.exports = TeamModel;
