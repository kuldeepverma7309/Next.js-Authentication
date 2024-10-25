// userModel.ts
import mongoose, { Schema, models, model } from "mongoose";
import bcryptjs from "bcryptjs";

// Define the schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    },
});

// Password hashing middleware
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // @ts-ignore
        this.password = await bcryptjs.hash(this.password, 8);
    }
    next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcryptjs.compare(enteredPassword, this.password);
};

// Export the model
const User =  mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
