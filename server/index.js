require("dotenv").config({ path: "./config.env" });
const experss = require("express");
const UserRoute = require("./Routes/UserRoute");
const App = experss();
const cors = require("cors");
const mongoose = require("mongoose");
const { QuizeRouter } = require("./Routes/QuizeRoute");

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database is connected Successfully");
  })
  .catch((Err) => {
    console.log("something wrong with Database : ", Err.message);
  });
// cors is used to allow the frontend to access the backend from different port
App.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

App.use(experss.json())
// user route which contains the user related routes like register, login, profile
App.use("/quiz", UserRoute);
App.use("/quizroute",QuizeRouter)

App.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

// API Endpoints
// POST /quiz/register - Register a new user
// POST /quiz/login - Login a user
// GET /quiz/profile - Get user profile (Protected)
// PUT /quiz/updateprofile - Update user profile (Protected, supports image upload)
