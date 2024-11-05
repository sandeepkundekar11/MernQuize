import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllQuizApiCall } from "../Redux/Actions/GetAllQuizAction";
import QuizAlreadyAttentedPopup from "./HelperComponent/QuizAlreadyAttentedPopup";
import QuizNoticePopup from "./HelperComponent/QuizNoticePopup";
const QuizCard = React.lazy(() => import("./SubComponents/QuizCard"));
const SubjectQuizzes = () => {
  const Dispatch = useDispatch()
  const { allQuiz, allQuizError, allQuizLoading } = useSelector((state) => state.allQuiz)
  const Navigate = useNavigate()
  const [showNotice, setShowNotice] = useState(false)
  // store the information for the selected quiz and sent to  Notice component
  const [SelectedQuizInfo, setSelectedQuizeInfo] = useState({ duration: 0, questionNumbers: 0, id: null })
  //stores all the Quiz in to state
  const [AllQuiz, setAllquiz] = useState([])
  // selected subject
  const [SelectedSubject, setSelectedSubject] = useState("All");
  //checks that if that user is already attended the quiz or user is author
  const [IsQuizAlreadyAttempted, setIsQuizAlreadyAttempted] = useState(false)
  // checks the user
  const [isAuthor, setISAuthor] = useState(false)
  // all subjects
  const subjects = ["All", "Maths", "Science", "History", "Technology"];
  // get subject from params
  const { QuizSubject } = useParams();
  useEffect(() => {
    // set selected subject from params
    setSelectedSubject(QuizSubject);
    Dispatch(getAllQuizApiCall())
  }, []);

  useEffect(() => {
    // set the quiz in to array
    setAllquiz(allQuiz)
  }, [allQuiz])

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="md:w-11/12 w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Subject-wise Quizzes
        </h1>
        {/* Subject-wise Quizzes tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => {
                setSelectedSubject(subject);
              }}
              className={` ${SelectedSubject === subject && "bg-blue-600 text-white"
                } px-4 py-2 rounded-full text-sm font-medium  text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Quizzes cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* filter quizzes based on selected subject */}
          {AllQuiz
            .filter((subject) => {
              if (SelectedSubject === "All") {
                return subject;
              } else {
                return subject.quizeCategory === SelectedSubject;
              }
            })
            .map((quiz) => {
              return <QuizCard key={quiz.id} quiz={quiz} ClickHandle={() => {
                // sending bellow information to notice quiz component
                setSelectedQuizeInfo({
                  duration: quiz?.quizeDuration,
                  questionNumbers: quiz?.quizeQuestions?.length,
                  id: quiz?._id
                })

                // here bellow we are checking that does user has already attempted the quiz or user is other of that clicked quiz
                let userId = JSON.parse(localStorage.getItem("user"))._id
                console.log(userId,)
                if (quiz?.quizAuthor === userId) {
                  setIsQuizAlreadyAttempted(true)
                  setISAuthor(true)
                }
                else if (quiz?.quizAttendedBy?.includes(userId)) {
                  setIsQuizAlreadyAttempted(true)
                  setISAuthor(false)
                }
                else {
                  setShowNotice(true)
                  setISAuthor(false)
                }
              }
              } />;
            })}
        </div>

        {/* here we are getting the element related to that tab and checking its length */}
        {AllQuiz?.filter((subject) => {
          if (SelectedSubject === "All") {
            return subject
          }
          else {
            return subject.quizeCategory === SelectedSubject
          }
        }).length === 0 && (
            <p className="text-center text-2xl text-gray-500 mt-8">
              No quizzes found for this subject.
            </p>
          )}
      </div>


      {/* notice Popup */}
      {
        showNotice && <QuizNoticePopup
          SelectedQuizInfo={SelectedQuizInfo}
          onAgree={() => Navigate(`/attemptquiz/${SelectedQuizInfo.id}`)}
          onCancel={() => {
            setShowNotice(false)
          }} />
      }
      {
        // show warning popups
        IsQuizAlreadyAttempted &&
        <QuizAlreadyAttentedPopup cancel={() => setIsQuizAlreadyAttempted(false)} isAuthor={isAuthor} />
      }
    </div>
  );
};
export default memo(SubjectQuizzes);
