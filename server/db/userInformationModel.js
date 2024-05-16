const mongoose = require("mongoose");

const usersInformationSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  location: { type: String },
  description: { type: String },
  occupation: { type: String },
  user_id: { type: String }
});

module.exports = mongoose.model.UsersInformation || mongoose.model("UsersInformation", usersInformationSchema);
