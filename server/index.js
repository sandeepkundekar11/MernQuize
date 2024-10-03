require("dotenv").config({ path: "./config.env" })
const experss = require("express")
const UserRoute = require("./Routes/UserRoute")
const App = experss()
const cors = require("cors")

// cors is used to allow the frontend to access the backend from different port
App.use(cors({
    origin: "*",
    credentials: true
}))
// user route which contains the user related routes like register, login, profile
App.use("/quiz", UserRoute)

App.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})