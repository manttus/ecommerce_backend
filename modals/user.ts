import mongoose from "mongoose";

interface User {
    email: String,
    password: String,
    imageUrl?: String,
    isAdmin: Boolean
}

const userSchema = new mongoose.Schema<User>({
    email: {type: String, required: true},
    password: {type: String, required: true},
    imageUrl: {type: String},
    isAdmin: {type: Boolean, required: true}
});

export default mongoose.model<User>('User', userSchema);