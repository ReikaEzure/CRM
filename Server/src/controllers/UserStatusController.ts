import { Request, Response } from 'express';
import pool from '../database'

class UserStatusController {
    public async load(req: Request, res: Response){
        const userStatus = await pool.then((r:any) => r.query('SELECT * FROM UserStatus'));
        res.json(userStatus);
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from userStatusController'});
    }
}

export const userStatusController = new UserStatusController();