const {Verification_Email_Template,Welcome_Email_Template}=require("../Middleware/EmailTemplate.js")
const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  service: process.env.SERVICE,
  post: process.env.EMAIL_PORT,
  secure: process.env.SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: "VERIFICATION",
      to: email,
      subject: "Verify your Email",
      text: "Verify your Email",
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
    console.log("Email send Successfully", response);
  } catch (err) {
     console.log("Email error", error);
  }
};
// export const sentWelcomeEmail = async (email, name) => {
//   try {
//     const response = await transporter.sendMail({
//       from: req.body.email, // sender address
//       to: process.env.EMAIL_USER, // list of receivers
//       subject: "Welcome to Assigment", // Subject line// plain text body
//       html: Welcome_Email_Template.replace("{name}", name),
//     });
//     console.log("Email send Successfully", response);
//   } catch (error) {
//     console.log("Email error", error);
//   }
// };
// let sendMail = (mailOptions) => {
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//   });
// };

module.exports = sendVerificationEmail;
