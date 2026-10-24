import express from "express"
import bcrypt from "bcrypt"
import userModel from "../../models/User.js"

const router = express.Router()

router.post("/register", async (req,res) =>{
    try {
        const {name, email, password} = req.body

        let checkIfExists = await userModel.findOne({email: email})

        if(checkIfExists){
            return res.status(400).json({
                "msg" : "User already exists with this Email!"
            })
        }

        let newUser = {
            name,
            email,
            password: await bcrypt.hash(password, 10)
        }

        let response = await userModel.create(newUser)

        res.status(201).json({
            "msg" : "User created successfully", response
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            "msg" : "internal server error"
        })
    }
})

router.post("/login", async (req,res) =>{
    try {
        let {email, password} = req.body

        let checkIfExists = await userModel.findOne({email: email})

        if(!checkIfExists){
            return res.status(404).json({
                "msg" : "No User found with this email. Please Register first"
            })
        }

        const passwordMatches = await bcrypt.compare(password, checkIfExists.password)

        if(!passwordMatches){
            return res.status(400).json({
                "msg" : "Incorrect credentials"
            })
        }
        

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            "msg" : "internal server error"
        })
    }
})

export default router