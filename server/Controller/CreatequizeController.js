const AsyncHandler = require("express-async-handler");
const { quize } = require("../Schema/QuizeSchema");
const { Quizequestion } = require("../Schema/QuestionsSchema");
const { user } = require("../Schema/UserSchema");
// @desc    Create a new quiz
// @route   POST /api/quizes
// @access  Private

const CreateQuize = AsyncHandler(async (req, res) => {
  const {
    quizeName,
    quizeDescription,
    quizeDuration,
    quizeDifficulty,
    quizeCategory,
    quizeQuestions,
    totalMarks,
  } = req.body;

  try {
    if (!quizeName || !quizeDescription || !quizeDuration || !quizeDifficulty || !quizeCategory || quizeQuestions.length < 1 || !totalMarks) {
      return res.json({ message: "please enter all details" })
    } else {
      // first creating the question in the loop
      const Allquestion = await Promise.all(
        quizeQuestions.map(async (questions) => {
          const {
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAnswer,
            marks,
          } = questions;
          return await Quizequestion.create({
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAnswer,
            marks,
          });
        })
      );

      // now creating the quiz
      const newQuize = await quize.create(
        {
          quizeName,
          quizeDescription,
          quizeDuration,
          quizeDifficulty,
          quizeCategory,
          quizeQuestions: Allquestion.map((question) => question._id),
          totalMarks,
          quizAuthor: req.userId,
        }
      );

      // update the quize
      const UpdateUser = await user.updateOne(
        { _id: req.userId },
        {
          $push: {
            createdquizes: newQuize._id,
          },
        }
      );

      res.status(200).json({
        message: "Quiz created successfully",
        quiz: newQuize,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = { CreateQuize };
