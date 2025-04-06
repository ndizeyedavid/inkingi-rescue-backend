import { Schema, model } from "mongoose";

const volunteerSchema = new Schema({
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
    description: {
        type: String,
    },
    postDate: {
        type: Date,
        default: Date.now,
    },
});

const Volunteer = model("Volunteer", volunteerSchema);

export default Volunteer;
