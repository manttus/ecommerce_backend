import { Router } from "express";
import { refreshAccessController , signupController ,loginController , createAdmin , adminLogin} from "../controller/auth-controller";

const authRouter = Router();

authRouter.post('/token', refreshAccessController);
authRouter.post('/signup', signupController);
authRouter.post('/admin', adminLogin);
authRouter.post('/login', loginController);
authRouter.post('/create', createAdmin);

export default authRouter;