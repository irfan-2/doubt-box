import mongoose from "mongoose"

const replySchema = new mongoose.Schema({
    doubt_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doubts",
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})

const replyModel = mongoose.model("replies", replySchema)

export default replyModel