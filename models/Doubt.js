import mongoose from "mongoose"

const doubtSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const doubtModel = mongoose.model("doubts", doubtSchema)

export default doubtModel

