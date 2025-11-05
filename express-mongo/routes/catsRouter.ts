import {Router, type Request, type Response } from "express";
import { getAllCatsController, getCatController, createCatController, updateCatController, deleteCatController } from "../controllers/catsController.ts";

const catsRouter = Router();

catsRouter.get("/", (req: Request, res: Response) => getAllCatsController(req, res));
catsRouter.get("/:id", (req: Request, res: Response) => getCatController(req, res));
catsRouter.post("/", (req: Request, res: Response) => createCatController(req, res));
catsRouter.put("/:id", (req: Request, res:Response) => updateCatController(req, res));
catsRouter.delete("/:id", (req: Request, res: Response) => deleteCatController(req, res));

export default catsRouter;