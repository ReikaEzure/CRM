import { Request, Response } from 'express';
import pool from '../database'

class ClientTypeController {
    public async load(req: Request, res: Response){
        const clientType = await pool.then((r:any) => r.query('SELECT * FROM ClientType'));
        res.json(clientType);
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from ClientTypeController'});
    }
}

export const clientTypeController = new ClientTypeController();