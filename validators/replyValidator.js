import {body, validationResult} from "express-validator"

let createReplyValidator = [
    body("message").trim()
    .notEmpty().withMessage("Reply message is required")
    .isLength({ min: 2, max: 2000 })
    .withMessage("Reply must be between 2 and 2000 characters")
];

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

export { createReplyValidator, validation};