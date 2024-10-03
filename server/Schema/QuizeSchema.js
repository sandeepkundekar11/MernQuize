const mongoose = require("mongoose");

// Define the schema for a quiz
const quizeSchema = new mongoose.Schema({
  quizeName: {
    type: String,
    required: true, // Quiz name is required
  },
  quizeDescription: {
    type: String,
    required: true, // Quiz description is required
  },
  quizeDuration: {
    type: Number,
    required: true, // Quiz duration is required
  },
  quizeDifficulty: {
    type: String,
    required: true, // Quiz difficulty level is required
  },
  quizeCategory: {
    type: String,
    required: true, // Quiz category is required
  },
  quizeQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question", // Reference to the Question model
    },
  ],
  quizAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model for the author
  },
  quizAttendedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for attendees
    },
  ],
  totalMarks: {
    type: Number,
    required: true, // Total marks for the quiz is required
  },

  createdAt: {
    type: Date,
    default: Date.now, // Default value is the current date and time
  },
});

// Create the model for a quiz
const quize = mongoose.model("Quize", quizeSchema);

// Export the quiz model
module.exports = quize;
