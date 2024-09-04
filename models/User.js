const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  address: String,
  postalCode: String,
  city: String,
  country: String,
  phone: String,
});

const UserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  newsletter: { type: Boolean, default: false },
  privacy: { type: Boolean, required: true },
  addresses: [addressSchema],
});

module.exports = mongoose.model("User", UserSchema);
