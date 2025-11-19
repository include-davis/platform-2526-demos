import { Router, type Request, type Response } from "express";
import { getAllUsersController, 
    getUserController, 
} from "../controllers/usersController.ts";

const usersRouter = Router();

usersRouter.get("/", (req: Request, res: Response) => getAllUsersController(req, res));
usersRouter.get("/:id", (req: Request, res: Response) => getUserController(req, res));

export default usersRouter;