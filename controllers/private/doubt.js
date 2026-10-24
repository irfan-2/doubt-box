import express from "express"
import doubtModel from "../../models/Doubt.js"

const Router = express.Router()

router.post("/create", async (req,res) =>{
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

export default router