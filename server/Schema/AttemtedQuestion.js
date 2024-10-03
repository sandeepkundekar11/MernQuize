const mongoose = require('mongoose');

const AttemtedQuestionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    userAnswer: {
        type: String,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const AttemtedQuestion = mongoose.model("AttemtedQuestion", AttemtedQuestionSchema);

module.exports = AttemtedQuestion;
