import {body, validationResult} from "express-validator"

let createDoubtValidator = [
    body("title").trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Title must be between 3 and 30 characters"),

    body("description").trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

     body("subject").trim()
    .notEmpty().withMessage("Subject is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Subject must be between 2 and 50 characters")
]

async function validation(req,res,next){
    try {
        let errors = await validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json(errors)
        }
    } catch (error) {
        console.log(error.message);
        
    }
}

export {createDoubtValidator, validation}