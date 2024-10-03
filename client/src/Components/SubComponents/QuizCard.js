import { memo } from "react";

const QuizCard = ({ quiz }) => {
    const { id, title, subject, questions, difficulty } = quiz;
    return (
        <div
            key={id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
        >
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{subject}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{questions} questions</span>
                    <span
                        className={`px-2 py-1 rounded-full ${difficulty === "Easy"
                            ? "bg-green-100 text-green-800"
                            : difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                    >
                        {difficulty}
                    </span>
                </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                    Start Quiz
                </button>
            </div>
        </div>
    )
}

export default memo(QuizCard);