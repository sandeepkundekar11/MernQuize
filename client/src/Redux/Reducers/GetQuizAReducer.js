import { GET_QUIZ, GET_QUIZ_ERR, GET_QUIZ_REQUEST } from "../Actions/GetQuizAction";

const quizInitialData = {
    CreatedQuiz: null,
    CreateQuizErr: null,
    CreateQuizLoading: false
}

export const GetQuizReducer = (state = quizInitialData, action) => {
    switch (action.type) {
        case GET_QUIZ:
            return {
                ...state,
                CreatedQuiz: action.payload,
                CreateQuizErr: null,
                CreateQuizLoading: false
            }
        case GET_QUIZ_REQUEST:
            return {
                ...state,
                CreateQuizErr: null,
                CreateQuizLoading: true
            }
        case GET_QUIZ_ERR:
            return {
                ...state,
                CreateQuizErr: action.payload,
                CreateQuizLoading: false
            }
        default:
            return state
    }
}