const express = require("express");
const router = express.Router();
const { localVariable, verifyToken } = require("../Middleware/Middleware");
const userController = require("../Controller/UserController");
router.post("/generateotp", localVariable, userController.postgenerateOtp);
router.post("/verifyotp/:id", verifyToken, userController.postverifyOTP);
router.get("/getcategory", verifyToken, userController.getCategory);
router.put("/update-category/:id",verifyToken, userController.postselectedCategory);
router.get(
  "/getuser/:id",
  verifyToken,
  userController.getUserById
);

module.exports = router;
