import mongoose from "mongoose";

interface Product {  
    name: String,
    price: String,
    imageUrl?: String,
    inStock: Boolean
}

const productSchema = new mongoose.Schema<Product>({
    name: {type: String, required: true},
    price: {type: String, required: true},
    imageUrl:{type: String, required: true},
    inStock:{type: Boolean, required: true}
});

export default mongoose.model<Product>('Product', productSchema);