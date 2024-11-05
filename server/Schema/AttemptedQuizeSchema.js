const mongoose = require("mongoose");

const attemptedQuizeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quizeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quize",
    required: true,
  },
  attemptedQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AttemptedQuestion",
    },
  ],
  score: {
    type: Number,
  },
});

const AttemptedQuize = mongoose.model("AttemptedQuize", attemptedQuizeSchema);

module.exports = { AttemptedQuize };
