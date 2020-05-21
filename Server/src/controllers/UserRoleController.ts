import { Request, Response } from 'express';
import pool from '../database'

class UserRoleController {
    public async load(req: Request, res: Response){
        const userRole = await pool.then((r:any) => r.query('SELECT * FROM UserRole'));
        res.json(userRole);
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from userRoleController'});
    }
}

export const userRoleController = new UserRoleController();