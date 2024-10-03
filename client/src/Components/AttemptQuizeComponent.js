import { memo, useEffect, useState } from "react";
import quizeDummyData from "../DummyData/QuizeDummyData.json";
const AttemptQuizeComponent = () => {
  const [quiz, setQuiz] = useState({});
  useEffect(() => {
    setQuiz(quizeDummyData);
  }, []);

  const onHandleQuize = (questionId, answer) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((ele) => {
        if (ele.id === questionId) {
          return {
            ...ele,
            userAnswer: answer,
          };
        } else {
          return {
            ...ele,
          };
        }
      }),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 bg-blue-600 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <div className="text-xl font-semibold">Time Remaining: 00:00</div>
          </div>
        </div>

        {quiz.questions?.map((question) => (
          <div
            key={question.id}
            className="bg-white shadow-md rounded-lg overflow-hidden mb-8"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {question.id}. {question.question}
              </h2>
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  >
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        className="mr-3 w-6 h-6"
                        onChange={(e) =>
                          onHandleQuize(question.id, e.target.value)
                        }
                      />
                      <span>{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              console.log(quiz);
            }}
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(AttemptQuizeComponent);
