import type { Request, Response } from 'express';

/**
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const loginController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        
        res.status(200).json({
            success: true,
        });
    } catch (e: unknown) {
        if (e instanceof Error){
            res.status(400).json({
                success: false,
                message: e.message,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "couldn't get error message",
            });
        }
    }
};