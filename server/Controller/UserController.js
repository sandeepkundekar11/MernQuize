const asyncHandler = require("express-async-handler");
const { user } = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // Check if the user already exists
    const userExists = await user.findOne({ email: email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    } else {
      // Hash the password before saving the user
      let hashedPassowrd = await bcrypt.hash(password, 12);
      let createUser = new user({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassowrd,
      });
      // Save the new user to the database
      await createUser.save();

      // Generate a JWT token for the new user
      let token = await jwt.sign(
        { _id: createUser._id },
        process.env.SECRET_KEY
      );
      res.status(200).json({
        message: "User created successfully",
        token: token,
        user: createUser,
      });
    }
  } catch (error) {
    // Handle any errors that occur during registration
    res.status(500).json({ message: error.message });
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const userExists = await user.findOne({ email: email });
    if (userExists) {
      // Compare the provided password with the stored hashed password
      let isMatch = await bcrypt.compare(password, userExists.password);
      if (isMatch) {
        // Generate a JWT token for the logged-in user
        let token = await jwt.sign(
          { _id: userExists._id },
          process.env.SECRET_KEY
        );
        res.status(200).json({
          message: "User logged in successfully",
          token: token,
          user: userExists,
        });
      } else {
        res.status(200).json({ message: "password is incorrect" });
      }
    } else {
      res.status(500).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors that occur during login
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    // Find the user by ID
    const userProfile = await user.findById({ _id: req.userId });
    if (userProfile) {
      const userInfo = {
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        bio: userProfile.bio,
        image: userProfile.image,
        _id: userProfile._id,
        createdQuizes: userProfile.createdquizes,
        joinedQuizes: userProfile.attenedquizes,
      };
      res.status(200).json({
        message: "User profile fetched successfully",
        user: userInfo,
      });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors that occur during fetching the user profile
    res.status(500).json({ message: error.message });
  }
});

// update profile
const UpdateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, bio } = req.body;
  let userInfo = {};
  if (firstName) userInfo.firstName = firstName;
  if (lastName) userInfo.lastName = lastName;
  if (bio) userInfo.bio = bio;
  if (req.file) userInfo.image = `http://localhost:8000/${req.file.filename}`;
  const userProfile = await user.updateOne(
    { _id: req.userId },
    { $set: userInfo },
    { new: true }
  );
  if (userProfile) {
    res.status(200).json({
      message: "User profile updated successfully",
      user: userProfile,
    });
  } else {
    res.status(200).json({ message: "User not found" });
  }
});

module.exports = { registerUser, loginUser, getUserProfile, UpdateProfile };
