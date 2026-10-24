import express from "express"
import dotenv from "dotenv"

dotenv.config()
import "./config/database.js"

const app = express()

app.use(express.json())

const port = process.env.PORT || 5000

app.get("health", (req,res) =>{
    res.status(200).json({
        "msg" : "APIs are healthy"
    })
})

app.listen(port, ()=>{
    console.log("Server is running");
    
})