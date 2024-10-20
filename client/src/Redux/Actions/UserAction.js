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
