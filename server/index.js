require("dotenv").config({ path: "./config.env" })
const experss = require("express")
const App = experss()

App.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})