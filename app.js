require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AuthRoute = require("./Routes/AuthRoute");
const UserRoute = require("./Routes/UserRoute");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("connected");
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);

app.listen(port, () => {
  console.log(`listning at port ${port}`);
});
