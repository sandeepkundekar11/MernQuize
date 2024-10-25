import Localhost from "../../Constants"

export const ADD_QUIZ = "ADD_QUIZ"
export const ADD_QUIZ_ERROR = "ADD-QUIZ_ERROR"
export const ADD_QUIZ_REQUEST = "ADD_QUIZ_REQUEST"

const addQuizAction = (data) => {
    return {
        type: ADD_QUIZ,
        payload: data
    }
}

const addQuizError = (err) => {
    return {
        type: ADD_QUIZ_ERROR,
        payload: err
    }
}
const addQuizRequest = () => {
    return {
        type: ADD_QUIZ_REQUEST
    }
}

const AddQuizApiCall = (quize,showSuccess) => {
    return async (Dispatch) => {
        Dispatch(addQuizRequest())
        try {
            const token = localStorage.getItem("token")
            let response = await fetch(`http://${Localhost}:8000/quizroute/addQuize`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quize)
            })
            let data = await response.json()
            if (data.message === "Quiz created successfully") {
                Dispatch(addQuizAction(data.message))
                localStorage.removeItem("quize")
                showSuccess()
            }
            else {
                Dispatch(addQuizError(data.message))
            }
        } catch (error) {
            Dispatch(addQuizError(error.message))
        }
    }
}

export { AddQuizApiCall }
