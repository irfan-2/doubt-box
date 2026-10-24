import express from "express"
import doubtModel from "../../models/Doubt.js"
import router from "../public/user.js"
import { createDoubtValidator } from "../../validators/doubtValidator.js"
import { validation } from "../../validators/userValidator.js"

const Router = express.Router()

router.post("/create",createDoubtValidator,validation, async (req,res) =>{
    try {
        let userId = req.user.id

        const { title, description, subject} = req.body

        const doubt = await doubtModel.create({
            user_id: userId,
            title,
            description,
            subject
        })

        return res.status(201).json({
            "msg" : "Doubt posted successfully", doubt
        }) 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg" : "internal server error"
        })
    }
})

router.get("/get", async (req,res) =>{
    try {
        const doubts = await doubtModel.find()
                                       .populate("user_id" ,"name email -_id")
                                       .sort({createdAt: -1})

        return res.status(200).json({
            "msg" : "All doubts fetched successfully",
            total: doubts.length,
            doubts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg" : "internal server error"
        })
    }
})

router.get("/my-doubts", async (req,res) =>{
    try {
        const userId = req.user.id 

        const doubts = await doubtModel.find({user_id: userId})
        .sort({createdAt: -1})

        return res.status(200).json({
            "msg" : "Here are all the doubts you posted",
            total: doubts.length,
            doubts
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg" : "internal server error"
        })
    }
})

export default router