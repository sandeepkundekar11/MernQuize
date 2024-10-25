import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import quizeDummyData from "../DummyData/QuizeDummyData.json";
const AttemptQuizeComponent = () => {
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState({});

  // creating a function which stores the quiz duration in localstorage
  const setCounter = () => {
    let quizDuration = localStorage.getItem("countdown")
    try {
      if (quizDuration) {
        return JSON.parse(quizDuration)
      }
      else {
        return {
          min: 0,
          sec: 10
        }
      }
    } catch (error) {
      console.log(error.messages)
    }
  }


  const submiteQuiz = () => {
    alert("submited")
    navigate("/")
  }
  const [quizDuration, setQuizDuration] = useState(setCounter())
  const [isTimerActive, setIsTimerActive] = useState(true)

  useEffect(() => {
    setIsTimerActive(true)
  }, [])

  // setting the counter
  useEffect(() => {
    if (!isTimerActive || (quizDuration.min === 0 && quizDuration.sec === 0)) {
      return; // Do nothing if the timer is inactive or has reached 0:0
    }
  
    // Create the interval only when timer is active
    let timeinterval = setInterval(() => {
      setQuizDuration((prevDuration) => {
        if (prevDuration.min === 0 && prevDuration.sec === 0) {
          clearInterval(timeinterval); // Stop the timer when it reaches 0:0
          setIsTimerActive(false); // Permanently stop the timer
          return { min: 0, sec: 0 }; // Reset time to 0
        }
  
        if (prevDuration.sec === 0) {
          return {
            min: prevDuration.min - 1,
            sec: 59,
          };
        }
  
        return {
          ...prevDuration,
          sec: prevDuration.sec - 1,
        };
      });
    }, 1000);
  
    return () => {
      clearInterval(timeinterval); // Clean up the interval on component unmount
    };
  }, [isTimerActive]);

  useEffect(() => {
    localStorage.setItem("countdown", JSON.stringify(quizDuration));
    if (quizDuration.min === 0 && quizDuration.sec === 0) {
      localStorage.removeItem("countdown");
    }
  }, [quizDuration,isTimerActive]);

  // 
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
          <div className="bg-blue-600 p-4">
            {/* quize Title */}
            <div className="flex items-center">
              <p className="text-2xl text-white font-semibold">Title :</p>
              <p className="text-xl text-white pl-4 ">
                This Quize is for History
              </p>
            </div>
            {/* quize Discription */}
            <div className="pt-4">
              <p className="text-white text-2xl font-semibold">Discription</p>
              <p className="text-gray-300 text-lg ">
                n both the try-catch blocks, the catch block now sends a proper
                error response with status 500 (Internal Server Error) and an
                error message. You can customize the error message based on your
                application’s needs.
              </p>
            </div>
          </div>

          <div className="px-6 py-4 bg-blue-600 text-white flex justify-between items-center">
            {/* Author name */}
            <div className="flex flex-wrap">
              <p className="text-gray-100 text-xl font-medium">Created By :</p>
              <p className="text-gray-300 text-xl font-medium">Sandeep N K</p>
            </div>
            {/* timing duration */}
            <div className="text-xl font-semibold text-wrap">
              Time Remaining: {quizDuration.min}:{quizDuration.sec}
            </div>
          </div>
          {/*  */}
          <div className="px-6 py-4 bg-blue-600 text-white flex justify-between items-center">
            <span className="flex flex-wrap">
              <p className="text-gray-100 text-xl font-semibold">
                Difficulty :
              </p>
              <p className="text-gray-300 text-lg font-semibold">Medium</p>
            </span>

            <span className="flex flex-wrap">
              <p className="text-gray-100 font-semibold text-xl">Total Marks : </p>
              <p className="text-gray-300 text-lg font-semibold">10</p>
            </span>
            <span className="flex flex-wrap">
              <p className="text-gray-100 font-semibold text-xl">Category : </p>
              <p className="text-gray-300 text-lg font-semibold">History</p>
            </span>
          </div>
        </div>


        {/*  mapping all the questions */}
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

        <div className="mt-8 flex justify-start">
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
