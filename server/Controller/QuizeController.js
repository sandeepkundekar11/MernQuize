const AsyncHandler = require("express-async-handler");
const { quize } = require("../Schema/QuizeSchema");
const { AttemptedQuize } = require("../Schema/AttemptedQuizeSchema");
const { AttemptedQuestions } = require("../Schema/AttemptedQuestionSchema");
const { user } = require("../Schema/UserSchema");
const GetAllQuizes = AsyncHandler(async (req, res) => {
  try {
    // id: 1,
    // title: "Algebra Basics",
    // subject: "Mathematics",
    // questions: 20,
    // difficulty: "Easy",
    let AllQuizeInfo = await quize
      .find(
        {},
        {
          quizeName: 1,
          quizeDifficulty: 1,
          quizeCategory: 1,
          quizeQuestions: 1,
          quizeDuration:1
        }
      )

    return res.status(200).json( AllQuizeInfo );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


//get quiz
const GetQuiz=AsyncHandler(async(req,res)=>
{
  const{quizId }=req.params
  try {
  
    if(!quizId)
    {
      return res.status(400).json({message:"please provide the quize id"})
    }
    const quiz=await quize.find({_id:quizId},{
      quizeName:1,
      quizeDescription:1,
      quizAuthor:1,
      quizeDifficulty:1,
      quizeCategory:1, //{subject name}
      quizeDuration:1,
      totalMarks:1,
      quizAttendedBy:1
    }).populate("quizAuthor","firstName lastName").populate({
      path:"quizeQuestions",
      model:"Question"
    })

    return res.status(200).json(quiz)

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
            questions: question._id,
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
        attemptedQuestions: AttemptedAllQuestions.map(
          (question) => question._id
        ),
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
      },
    });

    // calculating the score
    const Quizescore =
      await AttemptedQuizeToFindScore.attemptedQuestions.reduce((curr, acc) => {
        if (curr.userAnswer === curr.question.correctAnswer) {
          return ++acc;
        }
      }, 0);

    // updating the score in AttemptedQuize
    let latestQuize = await AttemptedQuize.updateOne(
      { quizeId: quizeId },
      {
        $set: {
          score: Quizescore,
        },
      },
      {
        new: true,
      }
    );
    // update the user

    const UpdateUser = await user.updateOne(
      { _id: req.userId },
      {
        $push: {
          createdquizes: newQuize._id,
        },
      }
    );

    return res.status(200).json({ quizeResult: latestQuize });
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
    const attemptedQuize = await AttemptedQuize.findOne({
      quizeId: quizeId,
    })
      .populate({
        path: "quizeId",
        model: "Quize",
      })
      .populate({
        path: "attemptedQuestions",
        model: "AttemptedQuestion",
      });

    if (attemptedQuize) {
    }
    return res.status(200).json({ attemptedQuiz: attemptedQuize });
  } catch (error) {}
});

module.exports = {
  GetAllQuizes,
  GetQuiz,
  CheckQuize,
  GetUserAttemptedAllQuize,
  GetPerticularAttemptedQuize,
};
