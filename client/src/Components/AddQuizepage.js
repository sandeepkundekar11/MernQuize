import React, { memo, useState } from "react";
const AddQuestionPopUp = React.lazy(() => import("./SubComponents/AddQuestion"))
// AddQuizepage component to create a new quiz
const AddQuizepage = () => {
    const [quizInfo, setQuizInfo] = useState({
        quizName: "",
        quizDescription: "",
        quizDifficulty: "",
        quizTimeLimit: 0,
    });
    const [questions, setQuestions] = useState([]);
    const [warning, setWarning] = useState({
        quizNameWarning: "",
        quizDescriptionWarning: "",
        quizDifficultyWarning: "",
        quizTimeLimitWarning: "",
    });
    const [showAddQuestionPopUp, setShowAddQuestionPopUp] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizInfo({ ...quizInfo, [name]: value });
    };
    const handleCancel = () => {
        setShowAddQuestionPopUp(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        const newQuizeWarning = {
            quizNameWarning: "",
            quizDescriptionWarning: "",
            quizDifficultyWarning: "",
            quizTimeLimitWarning: "",
        };
        if (quizInfo.quizName.length <= 10) {
            newQuizeWarning.quizNameWarning = "Quize Name must be greater than 10 characters";
        }
        if (quizInfo.quizDescription.length <= 20) {
            newQuizeWarning.quizDescriptionWarning = "Quize Description must be greater than 20 characters";
        }

        if (quizInfo.quizDifficulty === "") {
            newQuizeWarning.quizDifficultyWarning = "Quize Difficulty is Required";
        }

        if (quizInfo.quizTimeLimit <= 0) {
            newQuizeWarning.quizTimeLimitWarning = "Quize Time Limit is Required";
        }
        if (quizInfo.quizName.length > 11 && quizInfo.quizDescription.length > 21 && quizInfo.quizDuration !== 0 && quizInfo.quizDifficulty !== "" && quizInfo.quizTimeLimit !== 0) {
            // if all the fields are filled then show the add question pop up
            // and set the quiz info to the quiz info state

            setShowAddQuestionPopUp(true);
        }
        setWarning(newQuizeWarning);
    };

    const SaveQuestions = (question) => {
        console.log(question);
        setShowAddQuestionPopUp(false);
        setQuestions([...questions, question]);
    }
    return (
        <div className="w-screen h-full pt-16">
            <div className="w-11/12 m-auto pt-6">
                <h1 className="text-3xl text-blue-600 font-semibold">Create Quiz</h1>

                <div className="mt-8">
                    {/* add Quize name */}
                    <div>
                        <h2 className="text-xl font-medium">Add Quize Name</h2>
                        <input
                            type="text"
                            placeholder="Enter Quize Name"
                            className="w-full h-12 outline-none border p-2 rounded focus:border-blue-950 mt-2"
                            name="quizName"
                            value={quizInfo.quizName}
                            onChange={handleChange}
                        />
                        <p className="warning text-sm text-red-600 font-bold mt-2"> {warning.quizNameWarning} </p>
                    </div>

                    {/* quize discription */}
                    <div className="mt-4">
                        <h2 className="text-xl font-medium">Add Quize Discription</h2>
                        <textarea
                            rows={6}
                            placeholder="Enter Quize Discription"
                            className="w-full border p-2 mt-2 rounded outline-none focus:border-blue-950"
                            name="quizDescription"
                            value={quizInfo.quizDescription}
                            onChange={handleChange}
                        />
                        <p className="warning text-sm text-red-600 font-bold mt-2"> {warning.quizDescriptionWarning} </p>
                    </div>
                    {/* quize duration and difficulty */}
                    <div className="sm:flex justify-between mt-4 sm:gap-4">
                        <div className="sm:w-1/2 w-full mr-2">
                            <h2 className="text-xl font-medium">Add Quize Time Limit</h2>
                            <select className="w-full h-12 outline-none border p-2 rounded focus:border-blue-950 mt-2"
                                name="quizTimeLimit"
                                value={quizInfo.quizTimeLimit}
                                onChange={handleChange}
                            >
                                <option value={0}>Select Time Limit</option>
                                <option value={5}>5 min</option>
                                <option value={10}>10 min</option>
                                <option value={15}>15 min</option>
                            </select>
                            <p className="warning text-sm text-red-600 font-bold mt-2"> {warning.quizTimeLimitWarning} </p>
                        </div>
                        <div className="sm:w-1/2 w-full sm:ml-2">
                            <h2 className="text-xl font-medium">Add Quize Difficulty</h2>
                            <select className="w-full h-12 outline-none border p-2 rounded focus:border-blue-950 mt-2"
                                name="quizDifficulty"
                                value={quizInfo.quizDifficulty}
                                onChange={handleChange}
                            >
                                <option value="">Select Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            <p className="warning text-sm text-red-600 font-bold mt-2"> {warning.quizDifficultyWarning} </p>
                        </div>
                    </div>

                    {/* add quize button */}
                    <div className="flex justify-end mt-4">
                        <button className="bg-blue-600 w-40 hover:bg-blue-700 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Add Questions</button>
                    </div>

                    {/* created quize blocks */}
                    {questions.map((question, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
                            <h2 className="text-xl font-medium mb-2">Question {index + 1}</h2>
                            <p className="mb-3">{question.question}</p>
                            <ul className="list-disc pl-5 mb-3">
                                {Object.entries(question.options).map(([key, value], idx) => (
                                    <li key={idx}>{key.split('option')[1]}: {value}</li>
                                ))}
                            </ul>
                            <p className="font-semibold">Correct Answer: {question.answer}</p>
                            <p className="font-semibold">Marks: {question.marks}</p>
                        </div>
                    ))}

                    {showAddQuestionPopUp && <AddQuestionPopUp handleCancel={handleCancel} addQuestion={SaveQuestions} />}
                </div>
            </div>
        </div>
    );
};

export default memo(AddQuizepage);
