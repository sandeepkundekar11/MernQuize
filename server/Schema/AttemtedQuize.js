const mongoose = require('mongoose');

const AttemtedQuizeSchme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quize: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quize",
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const AttemtedQuize = mongoose.model("AttemtedQuize", AttemtedQuizeSchme);

module.exports = AttemtedQuize;