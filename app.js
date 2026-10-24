import express from "express"
import dotenv from "dotenv"

dotenv.config()
import "./config/database.js"
import publicUserRouter from "./controllers/public/user.js"

const app = express()

app.use(express.json())

const port = process.env.PORT

app.get("/health", (req,res) =>{
    res.status(200).json({
        "msg" : "APIs are healthy"
    })
})

app.use("/user", publicUserRouter)

app.listen(port, ()=>{
    console.log("Server is running");
    
})