const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, // First name is required
    },
    lastName: {
        type: String,
        required: true, // Last name is required
    },
    email: {
        type: String,
        required: true, // Email is required
    },
    password: {
        type: String,
        required: true, // Password is required
    },
    createdquizes: [{
        ref: "Quize", // Reference to the Quize model for created quizzes
        type: mongoose.Schema.Types.ObjectId,
    }],
    attenedquizes: [{
        ref: "Quize", // Reference to the Quize model for attended quizzes
        type: mongoose.Schema.Types.ObjectId,
    }],
    createdAt: {
        type: Date,
        default: Date.now, // Default value is the current date and time
    },
    totalMarks: {
        type: Number,
        default: 0, // Default value for total marks is 0
    },
});

// Create the model for a user
const user = mongoose.model("User", userSchema);

// Export the user model
module.exports = { user };
