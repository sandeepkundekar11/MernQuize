import Localhost from "../../Constants";

export const GET_QUIZ = "GET_QUIZ"
export const GET_QUIZ_REQUEST = "GET_QUIZ_REQUEST"
export const GET_QUIZ_ERR = "GET_QUIZ_ERR"

const geQuizAction = (data) => {
    return {
        type: GET_QUIZ,
        payload: data
    }
}

const getQuizRequestAction = () => {
    return {
        type: GET_QUIZ_REQUEST
    }
}

const getQuizErrAction = (err) => {
    return {
        type: GET_QUIZ_ERR,
        payload: err
    }
}

export const GetQUizApiCall = (quizId) => {
    return async (Dispatch) => {
        try {
            Dispatch(getQuizRequestAction())
            const token = localStorage.getItem("token")
            let response = await fetch(`http://${Localhost}:8000/quizroute/getQuiz/${quizId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            let data = await response.json()
            if (data.message === "quiz retrieved successfully") {
                Dispatch(geQuizAction(data.quiz))
            }
            else {
                Dispatch(getQuizErrAction(data.message))
            }
        } catch (error) {
            Dispatch(getQuizErrAction(error.message))
        }
    }
}

