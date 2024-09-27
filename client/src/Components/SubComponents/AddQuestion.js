import React, { memo, useState } from "react";
const PopUpProvider = React.lazy(() =>
    import("../HelperComponent/PopUpProvider")
);
const AddQuestionPopUp = ({ handleCancel, addQuestion }) => {
    // State to store question information
    const [QuestionInfo, setQuestionInfo] = useState({
        question: "", // Stores the main question text
        options: {
            // Stores the multiple choice options
            option1: "",
            option2: "",
            option3: "",
            option4: "",
        },
        answer: "", // Stores the correct answer
        marks: 0, // Stores the marks for the question
    });

    // Handler for changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from event target
        if (name.startsWith("option")) {
            // Check if the changed field is an option
            setQuestionInfo({
                ...QuestionInfo, // Spread existing state
                options: {
                    ...QuestionInfo.options, // Spread existing options
                    [name]: value, // Update the changed option
                },
            });
        } else {
            // For changes in fields other than options
            setQuestionInfo({
                ...QuestionInfo, // Spread existing state
                [name]: value, // Update the changed field
            });
        }
    };

    // State to store warnings for each field
    const [warning, setWarning] = useState({
        questionWarning: "", // Warning for question field
        optionsWarning: [
            // Array of warnings for each option
            { option1Warning: "" },
            { option2Warning: "" },
            { option3Warning: "" },
            { option4Warning: "" },
        ],
        answerWarning: "", // Warning for answer field
        marksWarning: "", // Warning for marks field
    });

    // Handler for form submission
    const handleSubmit = () => {
        const newWarning = {
            // Initialize warnings state
            questionWarning: "",
            optionsWarning: [
                { option1Warning: "" },
                { option2Warning: "" },
                { option3Warning: "" },
                { option4Warning: "" },
            ],
            answerWarning: "",
            marksWarning: "",
        };
        if (QuestionInfo.question.length <= 3) {
            // Validate question length
            newWarning.questionWarning = "Question cannot be less than 3 characters";
        }
        if (
            Object.entries(QuestionInfo.options).some(
                (option) => option[1].length <= 3 // Validate each option length
            )
        ) {
            Object.entries(QuestionInfo.options).forEach(([key, value], index) => {
                if (value.length <= 3) {
                    // Check if option length is less than 3
                    newWarning.optionsWarning[index][`option${index + 1}Warning`] =
                        "Option cannot be less than 3 characters";
                }
            });
        }
        if (QuestionInfo.answer === "") {
            // Validate if answer is provided
            newWarning.answerWarning = "Answer cannot be empty";
        }
        if (QuestionInfo.marks <= 0) {
            // Validate if marks are provided
            newWarning.marksWarning = "Marks cannot be empty";
        }
        if (
            QuestionInfo.question.length > 3 && // Corrected to 3
            QuestionInfo.answer !== "" &&
            QuestionInfo.marks >= 1 &&
            Object.entries(QuestionInfo.options).every(
                (option) => option[1].length > 3 // Corrected to 3
            )
        ) {
            // Check if all validations are passed
            console.log(QuestionInfo); // Log the question info for debugging

            // this is a callback function which is passed as a prop to the parent (AddQuizepage) component
            // it will add the question to the quiz
            addQuestion(QuestionInfo);
        }
        setWarning(newWarning); // Update the warnings state
    };
    return (
        <PopUpProvider>
            <div className="bg-white p-4 rounded-md h-auto">
                <h1 className="text-2xl font-bold">Add Question</h1>
                <form>
                    <div className="flex flex-col gap-2 mt-2">
                        <label htmlFor="question" className="font-semibold">
                            Enter Question
                        </label>
                        <p className="text-sm text-gray-500 ">
                            Enter the question in a way that it is easy to understand and
                            answer.
                        </p>
                        <textarea
                            rows={4}
                            type="text"
                            value={QuestionInfo.question}
                            onChange={handleChange}
                            name="question"
                            className="p-2 rounded-md border border-gray-300"
                            placeholder="Enter Question"
                        />
                        <p className="text-sm text-red-500 waring font-semibold ">
                            {warning.questionWarning}
                        </p>
                    </div>
                    {/* options */}
                    <p className="text-sm text-gray-500 mt-4">
                        Enter the options in a way that it is easy to understand and answer.
                    </p>
                    <div className="flex w-full gap-2">
                        <div className="flex flex-col gap-2 mt-4 w-1/2">
                            <input
                                type="text"
                                id="option1"
                                name="option1"
                                value={QuestionInfo.options.option1}
                                onChange={handleChange}
                                className="p-2 rounded-md border border-gray-300"
                                placeholder="Option 1"
                            />
                            <p className="text-sm text-red-500 waring font-semibold ">
                                {warning.optionsWarning[0].option1Warning}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 mt-4 w-1/2">
                            <input
                                type="text"
                                id="option2"
                                name="option2"
                                value={QuestionInfo.options.option2}
                                onChange={handleChange}
                                className="p-2 rounded-md border border-gray-300"
                                placeholder="Option 2"
                            />
                            <p className="text-sm text-red-500 waring font-semibold ">
                                {warning.optionsWarning[1].option2Warning}
                            </p>
                        </div>
                    </div>

                    <div className="flex w-full gap-2 mt-4 ">
                        <div className="flex flex-col gap-2 mt-4 w-1/2">
                            <input
                                type="text"
                                id="option3"
                                name="option3"
                                value={QuestionInfo.options.option3}
                                onChange={handleChange}
                                className="p-2 rounded-md border border-gray-300"
                                placeholder="Option 3"
                            />
                            <p className="text-sm text-red-500 waring font-semibold ">
                                {warning.optionsWarning[2].option3Warning}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 mt-4 w-1/2">
                            <input
                                type="text"
                                id="option4"
                                name="option4"
                                value={QuestionInfo.options.option4}
                                onChange={handleChange}
                                className="p-2 rounded-md border border-gray-300"
                                placeholder="Option 4"
                            />
                            <p className="text-sm text-red-500 waring font-semibold ">
                                {warning.optionsWarning[3].option4Warning}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        {/* answer dropdown */}
                        <div className="flex flex-col gap-2 mt-4 w-1/2">
                            <label htmlFor="answer" className="font-medium">
                                Answer
                            </label>
                            <select
                                id="answer"
                                name="answer"
                                value={QuestionInfo.answer}
                                onChange={handleChange}
                                className="p-2 rounded-md border border-gray-300"
                                placeholder="Select Answer"
                            >
                                <option value="">Select Answer</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                                <option value="option4">Option 4</option>
                            </select>
                            <p className="text-sm text-red-500 waring font-semibold ">
                                {warning.answerWarning}
                            </p>
                        </div>

                        {/* marks input */}
                        <div className="flex flex-col gap-2 mt-4 w-1/2 ml-2">
                            <label htmlFor="marks" className="font-medium">
                                Marks
                            </label>
                            <select
                                id="marks"
                                name="marks"
                                value={QuestionInfo.marks}
                                onChange={handleChange}
                                className="p-2 rounded-md border border-gray-300"
                            >
                                <option value={0}>Select Marks</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>5</option>
                                <option value={4}>10</option>
                            </select>
                            <p className="text-sm text-red-500 waring font-semibold ">
                                {warning.marksWarning}
                            </p>
                        </div>
                    </div>
                </form>
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleSubmit}
                    >
                        Add Question
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md ml-4"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </PopUpProvider>
    );
};

export default memo(AddQuestionPopUp);
