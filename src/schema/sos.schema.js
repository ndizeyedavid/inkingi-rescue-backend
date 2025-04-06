import { Schema, model } from "mongoose";

const sosSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    sos_type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    proof: {
        type: String,
        required: true,
    },
    location: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        enum: ["occuring", "resolved", "dismissed"],
        default: "occuring",
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comments",
        },
    ],
    volunteers: [
        {
            type: Schema.Types.ObjectId,
            ref: "volunteer",
        },
    ],
    postDate: {
        type: Date,
        default: Date.now,
    },
});

const Sos = model("Sos", sosSchema);

export default Sos;
