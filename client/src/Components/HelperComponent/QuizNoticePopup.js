import cancelImage from "../../Images/Cancel.png"
import PopUpProvider from "./PopUpProvider"
const QuizNoticePopup = ({SelectedQuizInfo, onCancel,onAgree}) => {
    const {duration ,questionNumbers}=SelectedQuizInfo
    return (
        <PopUpProvider>
            <div className="w-full h-auto bg-slate-200 rounded-md p-3">
                {/* heading */}
                <div className="noticeHead flex w-full  justify-between">
                    <h1 className="font-semibold text-xl">Quiz Instructions</h1>
                    <button className="w-8 h-8 float-left p-2 hover:bg-slate-300 rounded-full"  onClick={onCancel}>
                    <img src={cancelImage} alt="cancel"/>
                    </button>
                </div>
                <p className=" text-slate-500">Please read the following rules before starting the quiz:</p>

                {/* notices */}
                <ul className="list-disc p-4 text-gray-600 space-y-2">
                    <li>You will have {duration} minutes to complete the quiz</li>
                    <li>Ones Time completed Automatically Quiz will be submitted</li>
                    <li>There are {questionNumbers} multiple-choice questions.</li>
                    <li>Each question has only one correct answer.</li>
                    <li>Points are awarded for correct answers only. </li>
                    <li>There is no negative marking for wrong answers.</li>
                    <li>You are not allow to switch the tabs .<mark>if you which the tab Automatically Quiz will be submitted</mark> </li>
                </ul>


                <div className="w-full flex justify-end">
                    <button className="px-4 py-2 text-white rounded-md border bg-green-700 hover:bg-green-600 shadow-sm" onClick={onAgree}>I understood ,Start Quiz </button>
                </div>
            </div>
        </PopUpProvider>
    )
}
export default QuizNoticePopup