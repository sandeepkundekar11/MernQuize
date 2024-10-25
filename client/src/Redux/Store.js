import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import AddQuizReducer from "./Reducers/AddQuizeReducer,";
import { GetAllQuizeReducer } from "./Reducers/GetAllQuizReducer";
import { GetUserReducer, UpdateProfileReducer, userReducer } from "./Reducers/UserReducer";

const rootReducer = combineReducers({
    user: userReducer,
    addQuiz:AddQuizReducer,
    allQuiz:GetAllQuizeReducer,
    userProfile:GetUserReducer,
    updateProfile:UpdateProfileReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;