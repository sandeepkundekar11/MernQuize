const mongoose = require("mongoose");

const attemtedQuestionSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  userAnswer: {
    type: String,
    required: true,
  },
});

const AttemptedQuestions = mongoose.model(
  "AttemptedQuestion",
  attemtedQuestionSchema
);

module.exports = { AttemptedQuestions };
