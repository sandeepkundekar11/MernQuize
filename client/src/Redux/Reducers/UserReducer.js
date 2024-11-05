import { GET_USER_PROFILE, GET_USER_PROFILE_ERROR, GET_USER_PROFILE_REQUEST, JOIN_USER, JOIN_USER_ERROR, JOIN_USER_REQUEST, UPDATE_PROFILE, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQUEST } from "../Actions/UserAction"

const initialState = {
    loading: false,
    user: null,
    errorsmg: null
}

const UserData = {
    user: null,
    userLoading: false,
    userError: null
}

// update profile data
const userUpdateData = {
    updateMsg: null,
    updateLoading: false,
    updateprofileError: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case JOIN_USER_REQUEST:
            return { ...state, loading: true }
        case JOIN_USER_ERROR:
            return { ...state, loading: false, errorsmg: action.payload }
        case JOIN_USER:
            return { ...state, loading: false, user: action.payload }
        default:
            return state
    }
}


export const GetUserReducer = (state = UserData, action) => {
    switch (action.type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                user: action.payload,
                userLoading: false,
                userError: null
            }
        case GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                userLoading: true,
                userError: null
            }
        case GET_USER_PROFILE_ERROR:
            return {
                ...state,
                userLoading: false,
                userError: action.payload
            }
        default:
            return state
    }
}


export const UpdateProfileReducer = (state = userUpdateData, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                updateMsg: action.payload,
                updateLoading: false,
                updateprofileError: null
            }
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                updateLoading: true,
                updateprofileError: null
            }
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                updateLoading: false,
                updateprofileError: action.payload
            }
        default:
            return state
    }
}