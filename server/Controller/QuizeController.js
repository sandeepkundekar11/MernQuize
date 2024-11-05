const AsyncHandler = require("express-async-handler");
const { quize } = require("../Schema/QuizeSchema");
const { AttemptedQuize } = require("../Schema/AttemptedQuizeSchema");
const { AttemptedQuestions } = require("../Schema/AttemptedQuestionSchema");
const { user } = require("../Schema/UserSchema");
const GetAllQuizes = AsyncHandler(async (req, res) => {
  try {
    let AllQuizeInfo = await quize
      .find(
        {},
        {
          quizeName: 1,
          quizeDifficulty: 1,
          quizeCategory: 1,
          quizeQuestions: 1,
          quizeDuration: 1,
          quizAuthor: 1,
          quizAttendedBy: 1
        }
      )

    return res.status(200).json(AllQuizeInfo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


//get quiz
const GetQuiz = AsyncHandler(async (req, res) => {
  const { quizId } = req.params
  try {

    if (!quizId) {
      return res.status(400).json({ message: "please provide the quize id" })
    }
    const quiz = await quize.findOne({ _id: quizId }, {
      quizeName: 1,
      quizeDescription: 1,
      quizAuthor: 1,
      quizeDifficulty: 1,
      quizeCategory: 1, //{subject name}
      quizeDuration: 1,
      totalMarks: 1,
      quizAttendedBy: 1
    }).populate("quizAuthor", "firstName lastName").populate({
      path: "quizeQuestions",
      model: "Question"
    })

    return res.status(200).json({ message: "quiz retrieved successfully", quiz: quiz })

  } catch (error) {

  }
})


// check the submited quize result

const CheckQuize = AsyncHandler(async (req, res) => {
  try {
    const { quizeId } = req.params;
    const { questions } = req.body;



    // getting all the questions and add  in attempted question schema
    const AttemptedAllQuestions = await Promise.all(
      questions.map(async (question) => {
        return await AttemptedQuestions.create(
          {
            question: question._id,
            userAnswer: question.userAnswer,
          }
        );
      })
    );
    // creating the attempted quize in attempted quize schema
    const AttemptedQuizeInfo = await AttemptedQuize.create(
      {
        userId: req.userId,
        quizeId: quizeId,
        attemptedQuestions: AttemptedAllQuestions.map(q => q._id)
      }
    );

    // populating the attempted questions in attempted quize schema
    const AttemptedQuizeToFindScore = await AttemptedQuize.findOne({
      _id: AttemptedQuizeInfo._id,
    }).populate({
      path: "attemptedQuestions",
      model: "AttemptedQuestion",
      populate: {
        path: "question",
        model: "Question",
      }
    });


    let Quizescore = 0; // Initialize Quizescore

    for (const ele of AttemptedQuizeToFindScore.attemptedQuestions) {
      if (ele.userAnswer === ele.question.correctAnswer) {
        Quizescore += ele?.question?.marks || 0; // Use += to accumulate score
      }
    }




    // updating the score in AttemptedQuize
    let latestQuize = await AttemptedQuize.updateOne({
      _id: AttemptedQuizeInfo._id
    },
      {
        $set: {
          score: Quizescore,
        },
      }
    );

    // update the quiz
    let updateQuiz = await quize.updateOne({ _id: quizeId, }, {
      $push: { quizAttendedBy: req.userId }
    })

    // update the user
    const UpdateUser = await user.updateOne(
      { _id: req.userId },
      {
        $push: {
          attenedquizes: AttemptedQuizeInfo._id,
        },
        $inc: {
          totalMarks: +Quizescore
        }
      }
    );

    return res.status(200).json({ message: "quiz evaluated", quizResult: latestQuize });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get the all attempted quize of the user
const GetUserAttemptedAllQuize = AsyncHandler(async (req, res) => {
  try {
    const UserAttemptedQuizzses = await AttemptedQuize.find({
      userId: req.userId,
    }).populate({
      path: "quizeId",
      model: "Quize",
    });

    return res.status(200).json({
      AttemptedQuizzes: UserAttemptedQuizzses,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// gets the perticular attempted Quize
const GetPerticularAttemptedQuize = AsyncHandler(async (req, res) => {
  try {
    const { quizeId } = req.query;
    const attemptedQuize = await AttemptedQuize.findOne({ $and: [{ userId: req.userId }, { quizeId: quizeId }] }).populate({
      path: "attemptedQuestions",
      model: "AttemptedQuestion",
      populate: {
        path: "question",
        model: "Question"
      }
    })

    if (!attemptedQuize) {
      return res.status(404).json({ message: "quiz not found" })
    }
    return res.status(200).json(attemptedQuize.attemptedQuestions);
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
});

module.exports = {
  GetAllQuizes,
  GetQuiz,
  CheckQuize,
  GetUserAttemptedAllQuize,
  GetPerticularAttemptedQuize,
};
