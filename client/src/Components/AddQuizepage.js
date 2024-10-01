import React, { memo, useState, useEffect } from "react";
const AddQuestionPopUp = React.lazy(() =>
  import("./SubComponents/AddQuestionPopup")
);
const Question = React.lazy(() => import("./SubComponents/Question"));
// AddQuizepage component to create a new quiz
const AddQuizepage = () => {
  // Function to get quiz information from local storage
  const GetDataFromLoacalstorage = () => {
    let quize = localStorage.getItem("quize");
    if (quize) {
      return JSON.parse(quize);
    }
    return {
      quizName: "",
      quizDescription: "",
      quizDifficulty: "",
      quizTimeLimit: 0,
      quizSubject: "",
      questions: [],
    };
  };
  // State to hold quiz information
  const [quizInfo, setQuizInfo] = useState(GetDataFromLoacalstorage());
  // State to hold list of questions
  const [questions, setQuestions] = useState([]);
  // State to hold warning messages
  const [warning, setWarning] = useState({
    quizNameWarning: "",
    quizDescriptionWarning: "",
    quizDifficultyWarning: "",
    quizTimeLimitWarning: "",
    quizSubjectWarning: "",
  });
  // State to control visibility of the Add Question Popup
  const [showAddQuestionPopUp, setShowAddQuestionPopUp] = useState(false);
  // Handler for input changes, updates quizInfo state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizInfo({ ...quizInfo, [name]: value });
  };
  // Handler to close the Add Question Popup
  const handleCancel = () => {
    setShowAddQuestionPopUp(false);
  };
  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Initialize warnings
    const newQuizeWarning = {
      quizNameWarning: "",
      quizDescriptionWarning: "",
      quizDifficultyWarning: "",
      quizTimeLimitWarning: "",
      quizSubjectWarning: "",
    };
    // Validate quiz name length
    if (quizInfo.quizName.length <= 10) {
      newQuizeWarning.quizNameWarning =
        "Quize Name must be greater than 10 characters";
    }
    // Validate quiz description length
    if (quizInfo.quizDescription.length <= 20) {
      newQuizeWarning.quizDescriptionWarning =
        "Quize Description must be greater than 20 characters";
    }
    // Validate quiz difficulty selection
    if (quizInfo.quizDifficulty === "") {
      newQuizeWarning.quizDifficultyWarning = "Quize Difficulty is Required";
    }
    // Validate quiz time limit
    if (quizInfo.quizTimeLimit <= 0) {
      newQuizeWarning.quizTimeLimitWarning = "Quize Time Limit is Required";
    }
    // Validate quiz subject selection
    if (quizInfo.quizSubject === "") {
      newQuizeWarning.quizSubjectWarning = "Quize Subject is Required";
    }
    // Check if all validations are passed
    if (
      quizInfo.quizName.length > 11 &&
      quizInfo.quizDescription.length > 21 &&
      quizInfo.quizDuration !== 0 &&
      quizInfo.quizDifficulty !== "" &&
      quizInfo.quizTimeLimit > 0 &&
      quizInfo.quizSubject !== ""
    ) {
      // Show the add question popup and set the quiz info to the quiz info state
      setShowAddQuestionPopUp(true);
    }
    // Update the warnings state
    setWarning(newQuizeWarning);
  };
  // Function to save a question to the list of questions
  const SaveQuestions = (question) => {
    console.log(question); // Log the question for debugging
    setShowAddQuestionPopUp(false); // Close the Add Question Popup
    setQuizInfo({
      ...quizInfo,
      questions: [...quizInfo.questions, question],
    });
    setQuestions([...questions, question]); // Add new question to the list
  };



  useEffect(() => {
    // Save the quiz information to local storage whenever it changes
    localStorage.setItem("quize", JSON.stringify(quizInfo));
  }, [quizInfo]);

  return (
    <div className="w-full h-full pt-16">
      <div className="w-11/12 m-auto pt-6">
        <h1 className="text-3xl text-blue-600 font-semibold">Create Quiz</h1>

        <div className="mt-8">
          {/* Quiz Name Input */}
          <div>
            <h2 className="text-xl font-medium">Add Quiz Name</h2>
            <input
              type="text"
              placeholder="Enter Quiz Name"
              className="w-full h-12 outline-none border-2 p-2 rounded focus:border-blue-300 mt-2"
              name="quizName"
              value={quizInfo.quizName}
              onChange={handleChange}
            />
            <p className="warning text-sm text-red-600 font-bold mt-2">
              {warning.quizNameWarning}
            </p>
          </div>

          {/* Quiz Description Input */}
          <div className="mt-4">
            <h2 className="text-xl font-medium">Add Quiz Description</h2>
            <textarea
              rows={6}
              placeholder="Enter Quiz Description"
              className="w-full border-2 p-2 mt-2 rounded outline-none focus:border-blue-300"
              name="quizDescription"
              value={quizInfo.quizDescription}
              onChange={handleChange}
            />
            <p className="warning text-sm text-red-600 font-bold mt-2">
              {warning.quizDescriptionWarning}
            </p>
          </div>

          {/* Quiz Time Limit and Difficulty Selection */}
          <div className="sm:flex justify-between mt-4 sm:gap-4">
            <div className="sm:w-1/2 w-full mr-2">
              <h2 className="text-xl font-medium">Add Quiz Time Limit</h2>
              <select
                className="w-full h-12 outline-none border-2 p-2 rounded focus:border-blue-300 mt-2"
                name="quizTimeLimit"
                value={quizInfo.quizTimeLimit}
                onChange={handleChange}
              >
                <option value={0}>Select Time Limit</option>
                <option value={5}>5 min</option>
                <option value={10}>10 min</option>
                <option value={15}>15 min</option>
              </select>
              <p className="warning text-sm text-red-600 font-bold mt-2">
                {warning.quizTimeLimitWarning}
              </p>
            </div>
            <div className="sm:w-1/2 w-full sm:ml-2">
              <h2 className="text-xl font-medium">Add Quiz Difficulty</h2>
              <select
                className="w-full h-12 outline-none border-2 p-2 rounded focus:border-blue-300 mt-2 "
                name="quizDifficulty"
                value={quizInfo.quizDifficulty}
                onChange={handleChange}
              >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <p className="warning text-sm text-red-600 font-bold mt-2">
                {warning.quizDifficultyWarning}
              </p>
            </div>
          </div>

          {/* Quiz Subject Selection */}
          <div className="sm:flex  justify-start mt-4 sm:gap-4">
            <div className="sm:w-1/2 w-full">
              <h2 className="text-xl font-medium">Add Quiz Subject</h2>
              <select
                className="w-full h-12 outline-none border-2 p-2 rounded focus:border-blue-300 mt-2"
                name="quizSubject"
                value={quizInfo.quizSubject}
                onChange={handleChange}
              >
                <option value="">Select Subject</option>
                <option value="Maths">Maths</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
              </select>
              <p className="warning text-sm text-red-600 font-bold mt-2">
                {warning.quizSubjectWarning}
              </p>
            </div>
          </div>

          {/* Add Questions Button */}
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-600 w-40 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={handleSubmit}
            >
              Add Questions
            </button>
          </div>

          {/* {
           "question": "dsaaaaaaaaaaaaaaaaaaaaaaa",
           "options": {
           "option1": "dsasasasasasasasasasa",
           "option2": "sdadad",
           "option3": "dasdasd",
           "option4": "dasdsa"
            },
           "answer": "option1",
           "marks": "2"
          } */}

          <div className=" mt-6 space-y-3">
            {/* Display Created Quiz Questions */}
            {quizInfo.questions.map((ele, index) => {
              return (
                <Question
                  quizInfo={{
                    QuestionNumber: index + 1,
                    QuestionName: ele?.question,
                    Marks: ele?.marks,
                    options: Object.entries(ele?.options).map(
                      (option) => option[1]
                    ),
                    correctAns: ele?.options[ele?.answer],
                    IncorrectAnswers: Object.entries(ele?.options)
                      .filter((option) => option[0] !== ele?.answer)
                      .map((ele) => ele[1]),
                  }}
                />
              );
            })}
          </div>

          {/* Add Question Popup */}
          {showAddQuestionPopUp && (
            <AddQuestionPopUp
              handleCancel={handleCancel}
              addQuestion={SaveQuestions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(AddQuizepage);
