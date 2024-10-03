import { memo } from "react";

const Question = ({ quizInfo }) => {
  const {
    QuestionNumber,
    QuestionName,
    Marks,
    options = [],
    correctAns,
    IncorrectAnswers = [],
  } = quizInfo;

  return (
    <div className="w-full m-auto min-h-48 border-2 rounded-md p-4 bg-slate-100">
      {/* question name */}
      <div className="question flex items-center">
        <div className="flex text-xl font-semibold">
          <p>{QuestionNumber} .</p>
          <p>{QuestionName} ?</p>
        </div>
        <div className="marks ml-4 text-lg font-bold text-gray-700">
          <span className=" mr-2">Marks </span> : {Marks}
        </div>
      </div>
      {/*  options */}
      <div className="Options flex flex-wrap space-x-4 mt-6">
        {options?.map((option) => {
          return (
            <div className="w-40 h-12 border-2 rounded-xl border-l-4 flex justify-center items-center border-l-blue-500 bg-white ">
              {option}
            </div>
          );
        })}
      </div>
      {/* correct Answer */}
      <h1 className="text-xl mt-6 text-stone-800 font-semibold">
        Correct Answer :
      </h1>
      {/* correct option */}
      <div className="md:w-96 mt-4 h-10 p-2 rounded-md  bg-green-200 border-3 flex justify-between items-center">
        <p className=" text-xl font-semibold text-green-500">{correctAns}</p>
        {/* dots */}
        <div className="flex space-x-3">
          {options.map((ele) => {
            return (
              <div
                className={`w-3 h-3 rounded-full bg-white ${
                  ele === correctAns ? "bg-green-600" : ""
                } `}
              ></div>
            );
          })}
        </div>
      </div>
      {/* incorrect options heading */}
      <h1 className="text-xl mt-6 text-stone-800 font-semibold">
        Incorrect Answer
      </h1>
      <div className="mt-4 flex flex-wrap space-x-4">
        {IncorrectAnswers.map((ele) => {
          return (
            <div className="h-10 w-32 rounded-lg bg-red-300 flex justify-center items-center font-semibold">
              {ele}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(Question);
