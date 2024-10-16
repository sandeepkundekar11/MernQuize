import React, { memo, Suspense } from "react";
import QuizeSubjects from "../DummyData/QuizeSubjects.json";
import QuizeImage from "../Images/Quize_home.png";
import { useNavigate } from "react-router-dom";
const QuizeBox = React.lazy(() => import("./SubComponents/QuizeBox"));

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full pt-16">
      {/*  */}
      <div className="w-full m-auto md:h-[600px] h-auto md:flex items-center p-2 bg-slate-900 ">
        <div className="md:w-2/4 w-full text-pretty  flex flex-col items-center  h-auto">
          <h1 className="text-white md:text-5xl text-3xl text-center font-bold overflow-hidden">
            Challenge Your Mind, One Quiz at a Time
          </h1>
          <p className=" text-center text-lg text-white mt-5">
            Dive into our collection of engaging quizzes and challenge yourself
            across various topics. Sharpen your skills, boost your knowledge,
            and track your progress as you explore fun and interactive quizzes.
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-6  hover:bg-blue-600"
            onClick={() => {
              navigate(`/subjectquizes/${"All"}`);
            }}
          >
            View All Quizzes
          </button>
        </div>
        <div className="md:w-2/4 w-full h-auto flex justify-center md:mt-0 mt-12">
          <img className="w-[450px] h-[400px] " src={QuizeImage} alt="hello" />
        </div>
      </div>
      {/* all quiz section */}
      <div className="w-full h-full p-2">
        <h1 className="text-4xl text-center font-bold text-black">
          Available Quizzes
        </h1>
        <p className="text-center font-medium text-lg mt-6">
          Available Quizzes Choose from a variety of topics and test your
          knowledge.
        </p>

        <div className="w-11/12 m-auto flex flex-wrap p-4 space-x-12 ">
          <Suspense fallback={<h1>loading....</h1>}>
            {QuizeSubjects.map((quize) => (
              <QuizeBox
                key={quize.id}
                title={quize.name}
                discription={quize.description}
                path={quize.path}
                onView={() => {
                  navigate(`/subjectquizes/${quize.name}`);
                }}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
