import Localhost from "../../Constants"

const GET_ALL_QUIZ = "GET_ALL_QUIZ"
const GET_ALL_QUIZ_REQUIEST = "GET_ALL_QUIZ_REQUEST"
const GET_ALL_QUIZ_ERRORS = "GET_ALL_QUIZ_ERRORS"

const getAllQuiz = (data) => {
    return {
        type: GET_ALL_QUIZ,
        payload: data
    }
}

const getAllQuizRequest = () => {
    return {
        type: GET_ALL_QUIZ_REQUIEST
    }
}

const getAllQuizeError = (errors) => {
    return {
        type: GET_ALL_QUIZ_ERRORS,
        payload: errors
    }
}

const getAllQuizApiCall = () => {
    return async (Dispatch) => {
        try {
            const token = localStorage.getItem("token")
            Dispatch(getAllQuizRequest())
            let response = await fetch(`http://${Localhost}:8000/quizroute/getAllQuize`, {
                headers: {
                    "Authorization": `Bearer ${token} `
                }
            })

            let data = await response.json()

            if (data) {
                Dispatch(getAllQuiz(data))
            }
            else {
                Dispatch(getAllQuizeError(data.message))
            }
        } catch (error) {
            Dispatch(getAllQuizeError(error.message))
        }
    }
}

export {
    GET_ALL_QUIZ,
    GET_ALL_QUIZ_ERRORS,
    GET_ALL_QUIZ_REQUIEST,
    getAllQuizApiCall
}
