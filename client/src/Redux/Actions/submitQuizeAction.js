import Localhost from "../../Constants"

export const SUBMIT_QUIZ = "SUBMIT_QUIZ"
export const SUBMIT_QUIZ_REQUEST = "SUBMIT_QUIZ_REQUEST"
export const SUBMIT_QUIZ_ERR = "SUBMIT_QUIZ_ERR"

export const submitQuizAction = (data) => {
    return {
        type: SUBMIT_QUIZ,
        payload: data
    }
}

export const submitQuizRequestAction = () => {
    return {
        type: SUBMIT_QUIZ_REQUEST
    }
}

export const submitQuizErrAction = (err) => {
    return {
        type: SUBMIT_QUIZ_ERR,
        payload: err
    }
}


// submit Quiz api call

export const SubmitQuizApiCall = (quizId, questions,submit) => {
    return async (Dispatch) => {
        try {
            Dispatch(submitQuizRequestAction())
            const token = localStorage.getItem("token")
            let response = await fetch(`http://${Localhost}:8000/quizroute/submitQuize/${quizId}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ questions: questions })
            })

            let data = await response.json()
            if (data.message === "quiz evaluated") {
                Dispatch(submitQuizAction(data?.quizResult))
                console.log(data, "quiz result")
                submit()
            }
            else {
                Dispatch(submitQuizErrAction(data.message))
            }
        } catch (error) {
            Dispatch(submitQuizErrAction(error.message))
        }
    }
}