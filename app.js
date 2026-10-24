import express from "express"
import dotenv from "dotenv"

dotenv.config()
import "./config/database.js"
import authMiddleware from "./middleware/auth.js"
import publicUserRouter from "./controllers/public/user.js"
import privateDoubtRouter from "./controllers/private/doubt.js"
import privateReplyRouter from "./controllers/private/reply.js"

const app = express()

app.use(express.json())

const port = process.env.PORT

app.get("/health", (req,res) =>{
    res.status(200).json({
        "msg" : "APIs are healthy"
    })
})

app.use("/user", publicUserRouter)
app.use(authMiddleware)
app.use("doubt", privateDoubtRouter)
app.use("reply", privateReplyRouter)

app.listen(port, ()=>{
    console.log("Server is running");
    
})