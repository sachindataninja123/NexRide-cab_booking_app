const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "FirstName is required"],
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      uniques: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    socketId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
