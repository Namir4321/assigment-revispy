const User = require("../Model/User");
const Category = require("../Model/Category");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../Middleware/Mail");
const generateOtp = require("../Middleware/GenerateOtp");
exports.postgenerateOtp = async (req, res, next) => {
  const otp = generateOtp();
  console.log(otp);
  req.app.locals.OTP = otp;
  sendVerificationEmail(req.params.email, req.app.locals.OTP);
  console.log("Generated OTP:", otp);
};
exports.postverifyOTP = async (req, res) => {
  const { code } = req.body;
  const { id } = req.params;

  try {
    if (parseInt(req.app.locals.OTP) == parseInt(code)) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      const updateUser = await User.findByIdAndUpdate(
        { _id: id },
        { verified: true },
        { new: true }
      );
      if (!updateUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).send(updateUser);
    }
    return res.status(200).send({ message: "not verified" });
  } catch (err) {
    console.log(err);
  }
};

exports.resetSession = (req, res, next) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.send(200).json("access granted");
  }
  return res.status(404).send("session expired");
};

exports.getCategory = async (req, res, next) => {
  try {
    // Get page and limit from query parameters; use defaults if not provided
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const skip = (page - 1) * limit;

    // Get total number of categories (for calculating total pages)
    const totalCategories = await Category.countDocuments();

    // Retrieve the categories for the current page
    const categories = await Category.find().skip(skip).limit(limit);

    // Send response with the categories and pagination information
    res.status(200).json({
      categories,
      currentPage: page,
      totalPages: Math.ceil(totalCategories / limit),
    });
  } catch (error) {
    next(error);
  }
};

exports.postselectedCategory = async (req, res, next) => {
  console.log(req.params.id);
  const { id } = req.params;
  const { selectedCategories } = req.body;
  if (!Array.isArray(selectedCategories)) {
    return res
      .status(400)
      .json({ message: "selectedCategories must be an array" });
  }
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { selectedCategories } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Categories updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const user = await User.findById({ _id:id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
};
