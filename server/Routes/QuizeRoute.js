const express = require("express");
const { CreateQuize } = require("../Controller/CreatequizeController");
const { protect } = require("../Middleware/userMiddleware");
const {
  GetAllQuizes,
  CheckQuize,
  GetUserAttemptedAllQuize,
  GetPerticularAttemptedQuize,
  GetQuiz,
} = require("../Controller/QuizeController");
const QuizeRouter = express.Router();

// Quize Routes
QuizeRouter.post("/addQuize", protect, CreateQuize); // Route for the Adding the Quize
QuizeRouter.get("/getQuiz/:quizId",protect,GetQuiz)
QuizeRouter.get("/getAllQuize", protect, GetAllQuizes); // Route for getting all the Created Quize
QuizeRouter.put("/submitQuize/:quizeId", protect, CheckQuize); // Route for submiting and return the result of the Attempted quize
QuizeRouter.get("/allAttemptedQuize", protect, GetUserAttemptedAllQuize); //Route for getting all attempted Quize of that user
QuizeRouter.get(
  "/perticularAttemptedquize",
  protect,
  GetPerticularAttemptedQuize
); // Route for getting the Perticular attempted Quize Route- http://localhost:8000/quiz/perticularAttemptedquize?quizeId=""
module.exports = { QuizeRouter };
