import type { Request, Response } from 'express';
import { createUser, getAllUsers, getUserById } from '../services/usersService.ts';

/**
 * 
 * @param req Express request
 * @param res Express response
 */
export const getAllUsersController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const users = await getAllUsers(client);
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (e: unknown) {
        if (e instanceof Error){
            res.status(400).json({
                success: false,
                message: e.message,
            })
        } else {
            res.status(400).json({
                success: false,
                message: "couldn't get error message"
            })
        }
    }
};

/**
 * 
 * @param req Express request
 * @param res Express response
 */
export const getUserController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const id: string = req.params.id;
        const user = await getUserById(client, id);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (e: unknown) {
        if (e instanceof Error){
            res.status(400).json({
                success: false,
                message: e.message,
            })
        } else {
            res.status(400).json({
                success: false,
                message: "couldn't get error message"
            })
        }
    }
};

/**
 * 
 * @param req Express request
 * @param res Express response
 */
export const createUserController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;
        const user = await createUser(client, username, password);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (e: unknown) {
        if (e instanceof Error){
            res.status(400).json({
                success: false,
                message: e.message,
            })
        } else {
            res.status(400).json({
                success: false,
                message: "couldn't get error message"
            })
        }
    }
};
