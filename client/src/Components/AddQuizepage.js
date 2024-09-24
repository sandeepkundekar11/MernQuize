import { memo } from "react";

// AddQuizepage component to create a new quiz
const AddQuizepage = () => {
    return (
        <div className="w-screen h-screen pt-16">
            {/* Page title */}
            <h1 className="text-2xl font-bold text-center text-gray-800 mt-8">
                Create a new quiz by filling out the form below.
            </h1>
            <div className="w-11/12 m-auto mt-8">
                <form className="w-4/5 m-auto">
                    {/* Quiz Name input field */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="quiz-name"
                            className="text-gray-800 font-bold text-lg"
                        >
                            Quiz Name
                        </label>
                        <input
                            type="text"
                            id="quiz-name"
                            className="p-2 rounded-md border-2 border-gray-300 mt-2"
                        />
                    </div>
                    {/* Quiz Description input field */}
                    <div className="flex flex-col mt-8">
                        <label
                            htmlFor="quiz-description"
                            className="text-gray-800 font-bold text-lg"
                        >
                            Quiz Description
                        </label>
                        <textarea
                            id="quiz-description"
                            className="p-2 rounded-md border-2 border-gray-300 mt-2"
                        />
                    </div>
                    <div className="flex mt-8 justify-between">
                        {/* Quiz Category dropdown */}
                        <div className="flex flex-col w-1/2 justify-start pr-6">
                            <label
                                htmlFor="quiz-category"
                                className="text-gray-800 font-bold text-lg"
                            >
                                Quiz Category
                            </label>
                            <select
                                id="quiz-category"
                                className="p-2 rounded-md border-2 border-gray-300 mt-2 w-full"
                            >
                                <option value="category1">Beginner</option>
                                <option value="category2">Intermediate</option>
                                <option value="category3">Advanced</option>
                            </select>
                        </div>
                        {/* Quiz Duration input field */}
                        <div className="flex flex-col w-1/2 ">
                            <label
                                htmlFor="quiz-duration"
                                className="text-gray-800 font-bold text-lg text-start"
                            >
                                Quiz Duration
                            </label>
                            <input
                                type="number"
                                id="quiz-duration"
                                className="p-2 rounded-md border-2 border-gray-300 mt-2 w-full"
                            />
                        </div>
                    </div>
                    <hr className="w-full mt-8 border border-gray-300" />
                    {/* Question */}
                    <div className="flex mt-8 w-full ">
                        <div className="w-full">
                            <textarea type="text" className=" rounded-md border-2  w-full p-2" placeholder="Question 1" />
                        </div>
                    </div>
                    {/* options */}
                    <div className="mt-8 w-full ">
                        <div className="w-full flex">
                            <input type="text" className="p-2 rounded-md border-2 border-gray-300  w-11/12 mr-2" placeholder="Option 1" />
                            <input type="text" className="p-2 rounded-md border-2 border-gray-300 w-11/12 ml-2" placeholder="Option 2" />
                        </div>
                        <div className="w-full flex mt-2">
                            <input type="text" className="p-2 rounded-md border-2 border-gray-300  w-11/12 mr-2" placeholder="Option 3" />
                            <input type="text" className="p-2 rounded-md border-2 border-gray-300  w-11/12 ml-2" placeholder="Option 4" />
                        </div>
                    </div>
                    {/* Add Question button */}

                    <button className="bg-blue-500 text-white p-2 rounded-md mt-8 w-96 block">Add Question</button>
                    {/* Submit button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md mt-8 w-96"
                    >
                        Create Quiz
                    </button>
                </form>
            </div>
        </div>
    );
};

export default memo(AddQuizepage);
