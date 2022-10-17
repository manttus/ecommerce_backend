import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import Admin from "../models/admin";

export const refreshAccessController = async (req: Request, res: Response) => {

    if(req.body.token === null) return res.send({message: "Invalid Token"});
    
    jwt.verify(req.body.token, process.env.REFRESH as string, (err: jwt.VerifyErrors | null , user: string | jwt.JwtPayload | undefined) => {
        if(err) return res.send({message: "Invalid Token", error: err});
        const accessToken = jwt.sign({_id: (user! as jwt.JwtPayload)._id}, process.env.SECRET as string, {expiresIn: '70s'});
        res.status(201).send({accessToken, message: "Access Token Generated"});
    });
    
}

export const createAdmin =  async (req: Request, res: Response)  => {
    const admin = await Admin.findOne({email: req.body.email});
    if(admin){
        return res.send({message: "Account Already Exists"});
    }
    const newAdmin = new Admin(req.body);
    newAdmin.save();
    res.status(201).send({message: "Account Created Successfully"});

}

export const signupController = async (req: Request, res: Response)  => {
    const user = await User.findOne({email: req.body.email});
    if(user){
        return res.send({message: "Account Already Exists"});
    }
    const newUser = new User(req.body);
    newUser.save();
    res.status(201).send({message: "Account Created Successfully"});

}

export const loginController = async (req: Request, res: Response) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        // const newUser = new User(req.body);
        // newUser.save();
        return res.status(404).send({message: "Invalid Account"});
    }
    const accessToken = jwt.sign({_id: user!.id}, process.env.SECRET as string, {expiresIn: "70s"});
    const refreshToken = jwt.sign({_id: user!.id}, process.env.REFRESH as string);
    // const account = new User(req.body);
    // account.save();
    res.status(201).send({accessToken, refreshToken, message: "Successful" });
}

export const adminLogin = async (req: Request, res: Response) => {
    const admin = await Admin.findOne({email: req.body.email});
    if(!admin){
        // const newUser = new User(req.body);
        // newUser.save();
        return res.status(404).send({message: "Invalid Account"});
    }
    const accessToken = jwt.sign({_id: admin!.id}, process.env.SECRET as string, {expiresIn: "70s"});
    const refreshToken = jwt.sign({_id: admin!.id}, process.env.REFRESH as string);
    // const account = new User(req.body);
    // account.save();
    res.status(201).send({accessToken, refreshToken, message: "Successful" });
}