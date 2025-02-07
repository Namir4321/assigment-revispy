const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email already registered"],
      required: [true, "Please provide a email"],
    },
    password: {
      type: String,
      required: true,
      required: [true, "Please provide a password"],
    },
    verified: { type: Boolean, default: false },
    selectedCategories: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model("user", UserSchema);
