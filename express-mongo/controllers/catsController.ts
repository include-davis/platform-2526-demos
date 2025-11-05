import type { Request, Response } from 'express';
import { createCat, deleteCat, getAllCats, getCat, updateCat } from '../services/catsService.ts';

/**
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const getAllCatsController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const records = await getAllCats(client);
        res.status(200).json({
            success: true,
            data: records,
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

/**
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const getCatController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const id: string = req.params.id;
        const record = await getCat(client, id);
        res.status(200).send({
            success: true,
            data: record,
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

/**
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const createCatController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const name: string = req.body.name;
        const fur: string = req.body.fur;
        const record = await createCat(client, name, fur);
        res.status(200).json({
            success: true,
            data: record,
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

/**
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const updateCatController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const name: string = req.body.name;
        const fur: string = req.body.fur;
        const id: string = req.params.id;
        const record = await updateCat(client, id, name, fur);
        res.status(200).json({
            success: true,
            data: record,
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

/**
 * 
 * @param req Express Request
 * @param res Express Response
 */
export const deleteCatController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const id: string = req.params.id;
        await deleteCat(client, id);
        res.status(200).json({
            success: true,
            data: id,
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
                message: "couldn't get error message"
            });
        }
    }
};