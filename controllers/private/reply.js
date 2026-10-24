import express from "express"
import mongoose from "mongoose"
import replyModel from "../../models/Reply.js"
import doubtModel from "../../models/Doubt.js"

const router = express.Router()

router.post("/create/:doubtId", async (req,res) =>{
    try {
        const doubtId = req.params.doubtId
        const userId = req.user.id
        const {message} = req.body

        const doubtExists = await doubtModel.findById(doubtId)

        if(!doubtExists){
            return res.status(404).json({
                "msg" : "Doubt Not Found"
            })
        }

        const reply = await replyModel.create({
            doubt_id: doubtId,
            user_id: userId,
            message
        })

        return res.status(201).json({
            "msg" : "Reply posted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg" : "internal server error"
        })
    }
})