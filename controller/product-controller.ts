import { Request, Response } from "express"
import Product from "../modals/product"
import jwt from "jsonwebtoken";

export const getProductController = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(201).send({products});
}

export const addProductController = async (req: Request, res: Response) => {
    
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

    Product.findByIdAndUpdate(req.params.id as string, req.body, (err: jwt.VerifyErrors | null , product: string | jwt.JwtPayload | undefined) => {
        if(err) return res.send({message: "Updated Unsuccessful"});
        res.status(201).send({message: "Updated Successfully"});
    });
}

export const deleteProductController = async(req: Request, res: Response) => {
   
    await Product.findByIdAndDelete({_id: req.params.id}, (err: jwt.VerifyErrors | null , product: string | jwt.JwtPayload | undefined) => {
        if(err) return res.send({message: "Invalid Product"});
        res.status(201).send({message: "Product Deleted"});
    });
    
}