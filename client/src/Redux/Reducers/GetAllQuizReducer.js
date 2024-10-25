import { GET_ALL_QUIZ, GET_ALL_QUIZ_ERRORS, GET_ALL_QUIZ_REQUIEST } from "../Actions/GetAllQuizAction";

const initialdata = {
    allQuiz: [],
    allQuizError: null,
    allQuizLoading: false
}

export const GetAllQuizeReducer = (state = initialdata, action) => {
    switch (action.type) {
        case GET_ALL_QUIZ:
            return {
                ...state,
                allQuiz: action.payload,
                allQuizError: null,
                allQuizLoading: false
            }
        case GET_ALL_QUIZ_REQUIEST:
            return{
                ...state,
                allQuizError: null,
                allQuizLoading: true
            }
        case GET_ALL_QUIZ_ERRORS:
            return{
                ...state,
                allQuizError:action.payload,
                allQuizLoading: false
            }
        default:
            return state
    }
}