const mongoose = require("mongoose");

// Define the schema for a question
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  optionA: {
    type: String, 
  },
  optionB: {
    type: String,
   
  },
  optionC: {
    type: String,
   
  },
  optionD: {
    type: String,
   
  },
  correctAnswer: {
    type: String,
   
  },
  marks: {
    type: Number,
  
  },
});

// Create the model for a question
const Quizequestion = mongoose.model("Question", questionSchema);

// Export the question model
module.exports = { Quizequestion };
