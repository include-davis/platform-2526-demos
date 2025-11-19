import {Router, type Request, type Response } from "express";

const helloRouter = Router();

// GET just sends "hello world!" message
helloRouter.get("/", (req: Request, res: Response) => {
    res.json({
        message: "hello world!"
    })
});

export default helloRouter;