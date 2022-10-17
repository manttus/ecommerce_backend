import jwt from "jsonwebtoken";
import { Request, Response, NextFunction} from "express";


export const validateToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('authorization');
    if(!token) return res.status(401).send({message: "Access Denied"});
    const onlyToken = token.split(' ')[1];
    jwt.verify(onlyToken, process.env.SECRET as string, (err: jwt.VerifyErrors | null , user: string | jwt.JwtPayload | undefined) => {
        if(err){
            return res.status(400).send({messssage: "Invalid Token"});
        }
        else{
            req.body.user = user as jwt.JwtPayload;
            next();
        }
    });
    

}