import React, { memo } from "react";
import PopUpProvider from "../HelperComponent/PopUpProvider";

const DraftQuizePopup = ({ handleCreateNewQuiz, handleContinueEditing }) => {
    return (
        <PopUpProvider>
            <div className="w-full h-full p-4 h-[300px] w-[400px] ">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-semibold">Quiz is Drafted</h1>
                    <p className="text-lg text-gray-500 mt-4">
                        <li className="list-disc text-center">The Quize is already saved as a draft. If You want to Create a new Quize then Click on Create New Quize Button.</li>
                        <li className="list-disc text-center">If You want to edit the Quize then Click on continue editing button to edit the Quize.</li>
                    </p>
                    <div className="w-full h-full flex items-center justify-center space-x-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-6  hover:bg-blue-600" onClick={handleCreateNewQuiz}>
                            Create New Quiz
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-6  hover:bg-blue-600" onClick={handleContinueEditing}>
                            Continue Editing
                        </button>
                    </div>
                </div>
            </div>
        </PopUpProvider>
    )
};

export default memo(DraftQuizePopup);
