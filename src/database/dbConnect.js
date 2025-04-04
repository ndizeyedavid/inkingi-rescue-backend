import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Failed to connect to MongoDB. ERROR", err.message);
    }
};
export default dbConnect;
