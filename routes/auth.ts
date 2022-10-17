import { Router, Request, Response } from "express";
import { refreshAccessController , signupController ,loginController } from "../controller/auth-controller";

const authRouter = Router();

authRouter.post('/token', refreshAccessController);

authRouter.post('/signup', signupController);

authRouter.post('/login', loginController);

export default authRouter;