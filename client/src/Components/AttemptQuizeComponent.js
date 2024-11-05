import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetQUizApiCall } from "../Redux/Actions/GetQuizAction";
import { SubmitQuizApiCall } from "../Redux/Actions/submitQuizeAction";
import QuizSubmitPopup from "./HelperComponent/QuizSubmitPopup";
const AttemptQuizeComponent = () => {
  const Dispatch = useDispatch()
  // use to full screen the component
  const ComponentRef = useRef()
  const [ShowSubmitSuccess, setShowSubmiteSuccess] = useState(false)
  // till will check that wether quiz is submited or not till that screen will be full screened
  const { CreatedQuiz, CreateQuizLoading } = useSelector((state) => state.getQuiz)
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([])


  // creating a function which stores the quiz duration in localstorage
  const setCounter = useCallback(() => {
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
  }, []
  )


  // submit the quiz
  const submiteQuiz = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    Dispatch(SubmitQuizApiCall(id, questions, () => {
      setShowSubmiteSuccess(true)
      
    }))
  }
  const [quizDuration, setQuizDuration] = useState(setCounter())
  const [isTimerActive, setIsTimerActive] = useState(true)

  useEffect(() => {
    setIsTimerActive(true)
    // calling the quiz get api
    Dispatch(GetQUizApiCall(id))
  }, [])




  useEffect(() => {
    setQuiz(CreatedQuiz)
    // converting the quiz questions in to requird formate
    let mappedQuestions = CreatedQuiz?.quizeQuestions?.map((question) => {
      return {
        ...question,
        userAnswer: ""
      }
    })
    setQuestions(mappedQuestions)
    setQuizDuration({
      min: CreatedQuiz?.quizeDuration,
      sec: 0
    })

  }, [CreatedQuiz])


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
  }, [quizDuration, isTimerActive]);


  // checking the user visibility
  useEffect(() => {
    // Function to handle tab visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // alert("user navigated")
        console.log("User has navigated to another tab or minimized the browser.");
      } else if (document.visibilityState === 'visible') {
        console.log("User has returned to the tab.");
      }
    };


    // Adding event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    // Adding the beforeunload event listener
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])


  // handling the user answer function
  const HandleQuestion = (id, answer) => {
    let updateQuestions = questions.map((option) => {
      if (id === option?._id) {
        return {
          ...option,
          userAnswer: answer
        }

      }
      else {
        return {
          ...option
        }
      }
    })

    setQuestions(updateQuestions)
  }

  // Function to enter full screen
  const enterFullScreen = () => {
    if (ComponentRef.current.requestFullscreen) {
      ComponentRef.current.requestFullscreen();
    }
  };


  useEffect(() => {
    enterFullScreen(); // Enter full screen on mount
  }, []);

  return (
    <div className="min-h-full overflow-scroll bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-20" ref={ComponentRef}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="bg-blue-600 p-4">
            {/* quize Title */}
            <div className="flex items-center">
              <p className="text-2xl text-white font-semibold">Title :</p>
              <p className="text-xl text-white pl-4 ">
                {quiz?.quizeName}
              </p>
            </div>
            {/* quize Discription */}
            <div className="pt-4">
              <p className="text-white text-2xl font-semibold">Discription</p>
              <p className="text-gray-300 text-lg ">
                {quiz?.quizeDescription}
              </p>
            </div>
          </div>

          <div className="px-6 py-4 bg-blue-600 text-white flex justify-between items-center">
            {/* Author name */}
            <div className="flex flex-wrap">
              <p className="text-gray-100 text-xl font-medium">Created By :</p>
              <p className="text-gray-300 text-xl font-medium">{quiz?.quizAuthor?.firstName}{" "}{quiz?.quizAuthor?.lastName}</p>
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
              <p className="text-gray-300 text-lg font-semibold">{quiz?.quizeDifficulty}</p>
            </span>

            <span className="flex flex-wrap">
              <p className="text-gray-100 font-semibold text-xl">Total Marks : </p>
              <p className="text-gray-300 text-lg font-semibold">{quiz?.totalMarks}</p>
            </span>
            <span className="flex flex-wrap">
              <p className="text-gray-100 font-semibold text-xl">Category : </p>
              <p className="text-gray-300 text-lg font-semibold">{quiz?.quizeCategory}</p>
            </span>
          </div>
        </div>


        {/*  mapping all the questions */}
        {quiz?.quizeQuestions?.map((question, index) => (
          <div
            key={question.id}
            className="bg-white shadow-md rounded-lg overflow-hidden mb-8"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {index + 1}. {question.question}
              </h2>
              <div className="space-y-3">
                {
                  Object.values(question).map((option, index) => {
                    if (index > 1 && index < 6) {
                      return (
                        <div className="flex w-full h-10 bg-gray-100 rounded-md  items-center pl-4">
                          <input name={`question ${question._id}`} className="w-5 h-5 mr-2" type="radio" onClick={() => {
                            HandleQuestion(question._id, option)
                          }
                          } />
                          <span className="text-lg">{option}</span>
                        </div>
                      )
                    }

                  })
                }


                {/*  */}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-start">
          <button
            onClick={submiteQuiz}
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Quiz
          </button>
        </div>

        {
          // submit quiz popup

          ShowSubmitSuccess &&
          <QuizSubmitPopup />
        }
      </div>
    </div>
  );
};

export default memo(AttemptQuizeComponent);
