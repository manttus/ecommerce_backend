import express, {Request, Response, NextFunction} from 'express';
import dotenv from "dotenv";
import {json} from 'body-parser';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
dotenv.config();

const app = express();

mongoose.connect(process.env.CONNECT as string, (err: mongoose.CallbackError) => {

    if(err){
        console.log({message: err});
    }
    else{
        console.log({message: "Connect Successfully"});
    } 

});

app.use(json());
app.use('/auth', authRouter);
app.use('/', (req: Request, res: Response) => res.send({message: "Server Started"}));

app.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.listen(process.env.PORT, () => {
 console.log({message:`Server Started at ${process.env.PORT}`});
});
