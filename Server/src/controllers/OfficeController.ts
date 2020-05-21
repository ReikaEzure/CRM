import { Request, Response } from 'express';
import pool from '../database'

class OfficeController {
    public async load(req: Request, res: Response){
        const office = await pool.then((r:any) => r.query('SELECT * FROM Office'));
        res.json(office);
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from officeController'});
    }
}

export const officeController = new OfficeController();