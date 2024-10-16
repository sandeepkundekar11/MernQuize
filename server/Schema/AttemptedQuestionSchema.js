const mongoose = require("mongoose");

const attemtedQuestionSchem = new mongoose.Schema({
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
  attemtedQuestionSchem
);

module.exports = { AttemptedQuestions };
