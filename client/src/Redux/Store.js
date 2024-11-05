import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import AddQuizReducer from "./Reducers/AddQuizeReducer,";
import { GetAllQuizeReducer } from "./Reducers/GetAllQuizReducer";
import { GetQuizReducer } from "./Reducers/GetQuizAReducer";
import { SubmitQuizReducer } from "./Reducers/SubmitQuizReducer";
import { GetUserReducer, UpdateProfileReducer, userReducer } from "./Reducers/UserReducer";

const rootReducer = combineReducers({
    user: userReducer,
    addQuiz: AddQuizReducer,
    allQuiz: GetAllQuizeReducer,
    userProfile: GetUserReducer,
    updateProfile: UpdateProfileReducer,
    submitQuiz: SubmitQuizReducer,
    getQuiz: GetQuizReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;