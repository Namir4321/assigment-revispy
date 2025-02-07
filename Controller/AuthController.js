const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateOtp = require("../Middleware/GenerateOtp");
const {
  validateZodSchema,
  RegisterSchema,
  LoginSchema,
} = require("../FormValidation");
const sendVerificationEmail = require("../Middleware/Mail");
exports.postregister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const validateFields = await validateZodSchema(RegisterSchema, {
      email,
      password,
      name,
    });
    if (!validateFields) {
      return res.status(400).json(error.message);
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Please register with another email" });
    }
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const savedUser = await newUser.save();
      const otp = generateOtp();
      console.log(otp);
      req.app.locals.OTP = otp;
      sendVerificationEmail(savedUser.email, req.app.locals.OTP);
      console.log("Generated OTP:", otp);
      res.status(201).json(savedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message || err);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.postlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validateFields = await validateZodSchema(LoginSchema, {
      email,
      password,
    });
    if (!validateFields) {
      return res.status(400).json(error.message);
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (isMatch) {
      const userId = user._id;
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      if (user.verified === false) {
        const otp = generateOtp();
        console.log(otp);
        req.app.locals.OTP = otp;
        sendVerificationEmail(user.email, req.app.locals.OTP);
        console.log("Generated OTP:", otp);
      }
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(200).json({
        message: "Login successful",
        verified: user.verified,
        userId: user.id,
        category: user.selectedCategories.length,
        accessToken,
      });

    }
  } catch (err) {
    res.status(500).json(err.message || err);
  }
};
