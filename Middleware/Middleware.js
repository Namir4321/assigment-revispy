const jwt = require("jsonwebtoken");
const localVariable = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "You are not authenticated." });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Replace 'YOUR_SECRET_KEY' with the actual secret key used to sign JWT tokens.
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};
module.exports = { localVariable, verifyToken };
