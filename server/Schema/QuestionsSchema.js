const mongoose = require("mongoose");

// Define the schema for a question
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true, // Question text is required
  },
  optionA: {
    type: String,
    required: true, // Option A is required
  },
  optionB: {
    type: String,
    required: true, // Option B is required
  },
  optionC: {
    type: String,
    required: true, // Option C is required
  },
  optionD: {
    type: String,
    required: true, // Option D is required
  },
  correctAnswer: {
    type: String,
    required: true, // Correct answer is required
  },
  marks: {
    type: Number,
    required: true, // Marks for the question is required
  },
});

// Create the model for a question
const Quizequestion = mongoose.model("Question", questionSchema);

// Export the question model
module.exports = { Quizequestion };
