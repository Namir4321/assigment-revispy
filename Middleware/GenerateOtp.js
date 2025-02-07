const otpGenerator = require("otp-generator");
const generateOtp = (length = 8, options = {}) => {
  const otpOptions = {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
    ...options,
  };

  const otp = otpGenerator.generate(length, otpOptions);
  return otp;
};

module.exports = generateOtp;
