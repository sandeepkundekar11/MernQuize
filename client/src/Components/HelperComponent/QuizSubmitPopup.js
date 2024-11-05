import { useEffect, useState } from "react"
import successQuiz from "../../Images/SuccessQuiz.webp"
import PopUpProvider from "./PopUpProvider"
const QuizSubmitPopup = () => {

    const [showSuccess, setShowSucess] = useState(false)
    const [TimerCount, setTimerCount] = useState(5)

    useEffect(() => {
        let interval = setTimeout(() => {
            setShowSucess(true)
        }, 5000);
        return () => {
            clearTimeout(interval)
        }
    }, [])

    useEffect(() => {
        let timeInterval = setInterval(() => {


            if (TimerCount !== 0) {
                setTimerCount(TimerCount - 1)
            }
        }, 1000)

        return () => {
            clearInterval(timeInterval)
        }
    }, [TimerCount])
    return (
        <PopUpProvider >
            <div className="m-4">
                <div className="w-96  m-auto">
                    <div className="flex justify-center w-full mb-10">
                        <svg className="" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h1 className="text-xl text-green-600 font-medium">Quiz Submited Successfully</h1>
                    </div>
                    {/* loader */}
                    {
                        showSuccess ? <img className="w-28 h-28 animate-bounce m-auto" src={successQuiz} alt="success" /> :
                            <div className="relative h-28 w-28 m-auto">
                                <div className="m-auto absolute w-24 h-24 rounded-full flex justify-center items-center border-8 border-r-blue-800 border-b-blue-800 animate-spin">
                                </div>
                                <h1 className="text-4xl absolute top-8 left-10 font-medium text-black">{TimerCount}</h1>
                            </div>

                    }

                    <p className="mt-3 text-gray-600 text-center">Your answers have been recorded and will be reviewed shortly.</p>

                    {/*  */}
                    <div className="flex w-80 justify-around mt-5 m-auto">
                        <button className="w-36 h-9 text-white font-normal bg-green-500 hover:bg-green-600 shadow-md rounded-md">Preview</button>
                        <button className="w-36 h-9 text-white font-normal bg-blue-500 hover:bg-blue-600 shadow-md rounded-md">Attend New Quiz</button>
                    </div>
                </div>
            </div>
        </PopUpProvider>
    )
}
export default QuizSubmitPopup