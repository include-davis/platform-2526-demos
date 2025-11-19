import {Router, type Request, type Response } from "express";
import { loginController } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response) => loginController(req, res));

export default authRouter;