const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: Number, required: true },
  city: { type: String, required: true },
  url: { type: String, required: true },
});

const UserModel = mongoose.model("userdetails", UserSchema);

module.exports = UserModel;
