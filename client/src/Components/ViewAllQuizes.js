import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const QuizCard = React.lazy(() => import("./SubComponents/QuizCard"));
const SubjectQuizzes = () => {
  // selected subject
  const [SelectedSubject, setSelectedSubject] = useState("All");
  // all subjects
  const subjects = ["All", "Mathematics", "Science", "History", "Technology"];
  // get subject from params
  const { QuizSubject } = useParams();
  // all quizzes
  const quizzes = [
    {
      id: 1,
      title: "Algebra Basics",
      subject: "Mathematics",
      questions: 20,
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "World History",
      subject: "History",
      questions: 30,
      difficulty: "Medium",
    },
    {
      id: 3,
      title: "Physics Fundamentals",
      subject: "Science",
      questions: 25,
      difficulty: "Medium",
    },
    {
      id: 4,
      title: "Introduction to Computers",
      subject: "Technology",
      questions: 15,
      difficulty: "Easy",
    },
    {
      id: 5,
      title: "About Computer",
      subject: "Technology",
      questions: 15,
      difficulty: "Easy",
    },
    {
      id: 6,
      title: "USA History",
      subject: "History",
      questions: 15,
      difficulty: "Hard",
    },
  ];
  useEffect(() => {
    // set selected subject from params
    setSelectedSubject(QuizSubject);
  }, []);
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
          {quizzes
            .filter((subject) => {
              if (SelectedSubject === "All") {
                return subject;
              } else {
                return subject.subject === SelectedSubject;
              }
            })
            .map((quize) => {
              return <QuizCard key={quize.id} quiz={quize} />;
            })}
        </div>

        {quizzes.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No quizzes found for this subject.
          </p>
        )}
      </div>
    </div>
  );
};
export default memo(SubjectQuizzes);
