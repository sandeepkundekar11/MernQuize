import { JOIN_USER, JOIN_USER_ERROR, JOIN_USER_REQUEST } from "../Actions/UserAction"

const initialState = {
    loading: false,
    user: null,
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case JOIN_USER_REQUEST:
            return { ...state, loading: true }
        case JOIN_USER_ERROR:
            return { ...state, loading: false, error: action.payload }
        case JOIN_USER:
            return { ...state, loading: false, user: action.payload }
        default:
            return state
    }
}

export default userReducer;