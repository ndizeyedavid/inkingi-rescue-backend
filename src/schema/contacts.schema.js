import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 15,
    },
    relationship: {
        type: String,
        required: true,
    },
});

const Contact = model("Contact", contactSchema);

export default Contact;
