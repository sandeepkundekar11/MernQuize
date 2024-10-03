const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../Controller/UserController");
const { protect } = require("../Middleware/userMiddleware");

const UserRoute = express.Router();

UserRoute.post("/register", registerUser);
UserRoute.post("/login", loginUser);
UserRoute.get("/profile", protect, getUserProfile);

module.exports = UserRoute;
