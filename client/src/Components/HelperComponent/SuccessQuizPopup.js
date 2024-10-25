import PopUpProvider from "./PopUpProvider"

const SuccessQuizPopup = ({ createnewQuiz, GotoHomePage, quizInfo }) => {
    const { QuizTille, questionsNumbers } = quizInfo
    return (
        <PopUpProvider>
            <div className="w-full p-3  h-96 m-auto">
                <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>

                <h1 className="text-2xl text-center font-bold text-blue-600">Quiz Created Successfully!</h1>
                <p className="text-gray-500 text-lg mt-2 text-center w-80 border-b-2 m-auto">Your quiz "Introduction to React" has been created and is now ready to be taken.</p>
                <div className=" flex w-80 m-auto justify-between mt-7">
                    <div>
                        <p className="text-slate-500 ">Quiz Title</p>
                        <p className="text-black ">{QuizTille}</p>
                    </div>
                    <div>
                        <p className="text-slate-500">Number of Questions</p>
                        <p className="text-black">{questionsNumbers}</p>
                    </div>
                </div>
                <div className="successQuizButton flex flex-col  w-80  m-auto mt-2">
                    <button className="w-auto h-9 text-base border bg-blue-600 rounded-md p-1 text-white" onClick={GotoHomePage}>Go to Dashboard</button>
                    <button className="w-auto h-9 text-base mt-4 border-2 rounded-md p-1" onClick={createnewQuiz}>Create A New Quiz</button>
                </div>
            </div>
        </PopUpProvider>
    )
}
export default SuccessQuizPopup