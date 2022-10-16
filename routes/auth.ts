import { Router, Request, Response } from "express";
import User from '../modals/user';
const authRouter = Router();

authRouter.post('/signin', async (req: Request, res: Response) => {
    const exists = await User.findOne({email: req.body.email});

    if(!exists){
        const newUser = new User(req.body);
        newUser.save();
    }
    // const account = new User(req.body);
    // account.save();
    res.send({message: "Account Created Succefully"});

});

export default authRouter;