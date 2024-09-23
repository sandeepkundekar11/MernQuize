import { memo } from "react";

const QuizeBox = ({ title, discription, path }) => {
  return (
    <div className="w-72 min-h-56 max-h-max  border p-2 hover:shadow-md hover:shadow-gray-500">
      <div className="w-16 h-16 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10"
        >
          <path d={path} />
        </svg>
      </div>
      <h1 className="text-xl font-semibold ">{title}</h1>
      <p className="text-sm text-gray-500 mt-4">{discription}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-6  hover:bg-blue-600">
        Start Quiz
      </button>
    </div>
  );
};
export default memo(QuizeBox);
