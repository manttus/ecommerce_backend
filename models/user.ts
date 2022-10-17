import mongoose, { Types } from "mongoose";

interface cart {
    _id: Types.ObjectId,
    productName: string,
    productId: string,
    price: number,
    quantity: number,
}

interface receipts {
    _id: Types.ObjectId,
    recipient: string,
    recipientId: string,
    netTotal: number,
    date: Date,
    productName: string
    productId: string
}

interface User {
    email: string,
    password: string,
    imageUrl: string,
    cart: Types.DocumentArray<cart>,
    receipts: Types.DocumentArray<receipts>
}

const userSchema = new mongoose.Schema<User>({
    email: String,
    password: String,
    imageUrl: String,
    cart: [{productId: String, productName: String, price: Number, quantity: Number}],
    receipts: [{recipient: String, recipientId: String, netTotal: Number, date: Date, productName: String, productId: String}]
});

export default mongoose.model<User>('User', userSchema);