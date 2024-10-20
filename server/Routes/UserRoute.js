const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  UpdateProfile, // Import the UpdateProfile function from UserController
} = require("../Controller/UserController");
const { protect } = require("../Middleware/userMiddleware"); // Middleware to protect routes
const multer = require("multer"); // Middleware for handling multipart/form-data
const UserRoute = express.Router(); // Create a new router object
const path = require("path"); // Node.js path module
const UploadFilePath = path.join(__dirname, "../Uploads"); // Establish the directory path for storing uploaded files

// Configuration for storing uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UploadFilePath); // Set the destination of uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename of uploaded files
  },
});

const upload = multer({ storage: storage }); // Create multer instance with specified storage configuration

// User routes
UserRoute.post("/Signup", registerUser); // Route for user registration
UserRoute.post("/login", loginUser); // Route for user login
UserRoute.get("/profile", protect, getUserProfile); // Protected route for fetching user profile
UserRoute.put("/updateprofile", protect, upload.single("image"), UpdateProfile); // Protected route for updating user profile with image upload
module.exports = UserRoute; // Export the router
