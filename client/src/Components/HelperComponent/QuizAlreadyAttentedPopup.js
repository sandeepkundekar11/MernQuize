import cancelImage from "../../Images/Cancel.png"
import PopUpProvider from "./PopUpProvider"
const QuizAlreadyAttentedPopup = ({ cancel, isAuthor }) => {
    return (<PopUpProvider>
        <div className="w-28 h-28 m-auto rounded-full shadow-md bg-yellow-500 animate-bounce -mt-12"></div>
        <button className="w-10 -mt-12 h-10 float-right p-2 ml-2 hover:bg-slate-300 rounded-full" onClick={cancel}>
            <img src={cancelImage} alt="cancel" />
        </button>
        <div className="bg-white">

            <div className="md:w-[400px] w-80 m-auto p-4">
                <h1 className="text-2xl font-bold text-yellow-700">{isAuthor ? "Oops! Author can't attend the Quiz" : "Oops! Quiz Already Completed "}</h1>
                <p className="mt-4 text-gray-700 text-center">You've already showcased your brilliance in this quiz. Time to conquer new challenges!</p>

                <p className="mt-11 text-gray-700 text-center">Remember, true growth comes from exploring new territories. Why not try a different quiz?</p>


                <div className="w-full flex justify-center">
                    <button className="w-56  h-10 mx-auto border bg-blue-600  text-white  rounded-md mt-5" onClick={cancel}>Take New Quiz</button>
                </div>
            </div>
        </div>
    </PopUpProvider>)
}
export default QuizAlreadyAttentedPopup