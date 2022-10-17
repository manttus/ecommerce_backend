import { Request, Response } from "express"
import Product from "../modals/product"
import User from "../modals/user";


const isAdmin = async(id: string) => {

    const user =  await User.findById({_id: id});

    if(!user!.isAdmin){
        return false
    }
    return true;

}



export const getProductController = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(201).send({products});
}

export const addProductController = async (req: Request, res: Response) => {
    
    const adminStatus: boolean = await isAdmin(req.body.user._id)
    if(!adminStatus) return res.send({message: "Not Authorized"});

    const newProduct = new Product({
        name: (req.body as {name: string} ).name,
        price: (req.body as {price: string}).price,
        imageUrl: (req.body as {imageUrl: string}).imageUrl,
        inStock: (req.body as {inStock: boolean}).inStock
    })

    await newProduct.save();
    res.status(201).send({message: "Product Added"});

}

export const updateProductController = async(req: Request, res: Response) => {
    const adminStatus: boolean = await isAdmin(req.body.user._id)
    if(!adminStatus) return res.send({message: "Not Authorized"});

    Product.findByIdAndUpdate(req.params.id as string, {})


}

export const deleteProductController = async(req: Request, res: Response) => {
    const adminStatus: boolean = await isAdmin(req.body.user._id)
    if(!adminStatus) return res.send({message: "Not Authorized"});
    const product =  await Product.findById({_id: req.params.id});
    if(!product) return res.send({message: "Invalid Product"});
    await Product.findByIdAndDelete({_id: req.params.id});
    res.send({message: "Product Deleted"});
}