import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    sos_id: {
        type: Schema.Types.ObjectId,
        ref: "Sos",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    postDate: {
        type: Date,
        default: Date.now,
    },
});

const Comment = model("Comments", commentSchema);

export default Comment;
