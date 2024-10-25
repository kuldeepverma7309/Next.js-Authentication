
import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/next-auth");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};
export default connectDB;