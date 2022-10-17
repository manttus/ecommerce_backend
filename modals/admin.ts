import mongoose, { Types } from "mongoose";

interface Admin {
    email: string,
    password: string,
    imageUrl: string,
}

const adminSchema = new mongoose.Schema<Admin>({
    email: String,
    password: String,
    imageUrl: String,
});

export default mongoose.model<Admin>('Admin', adminSchema);