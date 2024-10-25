import Localhost from "../../Constants";

export const JOIN_USER = "JOIN_USER";
export const JOIN_USER_REQUEST = "JOIN_USER_REQUEST";
export const JOIN_USER_ERROR = "JOIN_USER_ERROR";

export const JoinUserRequest = () => {
    return {
        type: JOIN_USER_REQUEST
    }
}

export const JoinUserError = (error) => {
    return {
        type: JOIN_USER_ERROR,
        payload: error
    }
}

export const JoinUser = (user) => {
    return {
        type: JOIN_USER,
        payload: user
    }
}

// Get user  Profile

export const GET_USER_PROFILE = "GET_USER_PROFILE";
export const GET_USER_PROFILE_REQUEST = "GET_USER_PROFILE_REQUEST";
export const GET_USER_PROFILE_ERROR = "GET_USER_PROFILE_ERR"

export const getProfile = (info) => {
    return {
        type: GET_USER_PROFILE,
        payload: info
    }
}

export const getProfileRequest = () => {
    return {
        type: GET_USER_PROFILE_REQUEST
    }
}

export const getProfileError = (error) => {
    return {
        type: GET_USER_PROFILE_ERROR,
        payload: error
    }
}


// update profile action

export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST"
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR"


export const updateProfileAction = (data) => {
    return {
        type: UPDATE_PROFILE,
        payload: data
    }
}

export const updateProfileRequestAction = () => {
    return {
        type: UPDATE_PROFILE_REQUEST
    }
}

export const updateProfileErrorAction = (err) => {
    return {
        type: UPDATE_PROFILE_ERROR,
        payload: err
    }
}






// api calls
export const signUpUser = (userinfo, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(JoinUserRequest())
            let user = await fetch(`http://${Localhost}:8000/quiz/Signup`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(userinfo)
            })

            let response = await user.json()
            if (response.message === 'User created successfully') {
                localStorage.setItem("user", JSON.stringify(response.user))
                localStorage.setItem("token", response.token)
                dispatch(JoinUser(response.message))
                navigate("/")
            }
            else {
                dispatch(JoinUserError(response.message))
            }
        } catch (error) {
            dispatch(JoinUserError(error.message))
        }
    }
}

export const loginUser = (userinfo, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(JoinUserRequest())
            let user = await fetch(`http://${Localhost}:8000/quiz/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(userinfo)
            })

            let response = await user.json()
            if (response.message === "User logged in successfully") {
                localStorage.setItem("user", JSON.stringify(response.user))
                localStorage.setItem("token", response.token)
                dispatch(JoinUser(response.message))
                navigate("/")
            }
            else {
                dispatch(JoinUserError(response.message))
            }
        } catch (error) {
            dispatch(JoinUserError(error.message))
        }
    }

}


// calling get profile Api
export const getUserProfileApi = () => {
    return async (Dispatch) => {
        try {
            Dispatch(getProfileRequest())
            const Token = localStorage.getItem("token")
            let response = await fetch(`http://${Localhost}:8000/quiz/profile`, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            })
            let data = await response.json()
            if (data.message === "User profile fetched successfully") {
                Dispatch(getProfile(data?.user))
            }
            else {
                Dispatch(getProfileError(data.message))
            }
        } catch (error) {
            Dispatch(getProfileError(error.message))
        }
    }
}

// calling the update profile

export const UpdateProfileApiCall = (UpdatedProfile,userUpdated) => {
    return async (Dispatch) => {
        try {
            Dispatch(updateProfileRequestAction())
            let token = localStorage.getItem("token")
            let response = await fetch(`http://${Localhost}:8000/quiz/updateprofile`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: UpdatedProfile
            })
            let data = await response.json()

            if (data.message === "User profile updated successfully") {
                Dispatch(updateProfileAction(data.message))
                userUpdated()
            }
            else {
                Dispatch(updateProfileErrorAction(data.message))
            }
        } catch (error) {
            Dispatch(updateProfileErrorAction(error.message))
        }
    }
}