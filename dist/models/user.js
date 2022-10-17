"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    imageUrl: String,
    cart: [{ productId: String, productName: String, price: Number, quantity: Number }],
    receipts: [{ recipient: String, recipientId: String, netTotal: Number, date: Date, productName: String, productId: String }]
});
exports.default = mongoose_1.default.model('User', userSchema);
