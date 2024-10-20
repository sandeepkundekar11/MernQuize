import { ADD_QUIZ, ADD_QUIZ_ERROR, ADD_QUIZ_REQUEST } from "../Actions/AddQuizAction";

const Initialdata = {
    AddQuizMessage: null,
    AddQuizLoading: false,
    AddQuizError: null
}
const AddQuizReducer = (state = Initialdata, action) => {
    switch (action.type) {
        case ADD_QUIZ:
            return {
                AddQuizMessage: action.payload,
                AddQuizLoading: false,
                AddQuizError: null
            }

        case ADD_QUIZ_ERROR:
            return {
                ...state,
                AddQuizLoading: false,
                AddQuizError: action.payload
            }
        case ADD_QUIZ_REQUEST:
            return {
                ...state,
                AddQuizLoading: true,
                AddQuizError: null
            }
        default:
            return state
    }
}

export default AddQuizReducer