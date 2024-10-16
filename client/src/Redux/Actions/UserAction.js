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
            let user = await fetch("", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(userinfo)
            })
            let response = await user.json()
            if (response.message) {
                dispatch(JoinUser(response.message))
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
            let user = await fetch("", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(userinfo)
            })
            let response = await user.json()
            if (response.message) {
                dispatch(JoinUser(response.message))
            }
        } catch (error) {
            dispatch(JoinUserError(error.message))
        }
    }

}
