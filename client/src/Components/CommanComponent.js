import { memo } from "react";
import logo from "../Images/Quize_icon.png";
const CommanComponent = ({ children }) => {
    return (
        <div className="block md:h-screen h-full w-screen md:flex SignupPage">
            <div className="firstHalf mt-4 h-auto w-full items-center justify-center md:mt-0 md:flex md:h-full md:w-2/4 text-white ">
                <div className="flex h-auto w-full flex-col items-center justify-center p-5 mack-view">

                    <div className="h-60 w-60">

                        <img src={logo} alt="logo" className="h-full w-full" />
                    </div>

                    <h1 className="text-center text-4xl font-semibold">Discover a World of Quizzes and Start Creating Your Own! Ready to Test Your Knowledge</h1>
                    <p className="mt-6 text-balance text-center text-lg font-normal">Create your own quizzes in minutes, track your progress and rankings, and join thousands of quiz takers. Get instant feedback on your quiz attempts and start sharing your quizzes today!</p>

                </div>
            </div>
            <div className="Secondhalf flex w-full items-center justify-center md:w-2/4">
                {/* signup  */}
                {children}
            </div>
        </div>
    )
}

export default memo(CommanComponent);