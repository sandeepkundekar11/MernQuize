const AsyncHandler = require("express-async-handler");
const { quize } = require("../Schema/QuizeSchema");
const { Quizequestion } = require("../Schema/QuestionsSchema");
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
    // first creating the question in the loop
    const Allquestion = Promise.all(
      quizeQuestions.map(async (question) => {
        const {
          question,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAnswer,
          marks,
        } = question;
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
      },
      {
        new: true,
        // This option is not needed here as it is used in findAndUpdate operations in Mongoose to return the modified document rather than the original.
      }
    );

    res.status(200).json({
      message: "Quiz created successfully",
      quiz: newQuize,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = { CreateQuize };
