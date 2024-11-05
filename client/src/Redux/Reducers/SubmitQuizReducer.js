import { SUBMIT_QUIZ, SUBMIT_QUIZ_ERR, SUBMIT_QUIZ_REQUEST } from "../Actions/submitQuizeAction";

const quizInitaldata = {
    submitQuizMessage: null,
    submitQuizErr: null,
    submitQuizRequest: false
}


export const SubmitQuizReducer = (state = quizInitaldata, action) => {
    switch (action.type) {
        case SUBMIT_QUIZ:
            return {
                ...state,
                submitQuizMessage: action.payload,
                submitQuizErr: null,
                submitQuizRequest: false
            }
        case SUBMIT_QUIZ_REQUEST:
            return {
                ...state,
                submitQuizErr: null,
                submitQuizRequest: true
            }
        case SUBMIT_QUIZ_ERR:
            return {
                ...state,
                submitQuizErr: action.payload,
                submitQuizRequest: false
            }

        default:
            return state
    }
}