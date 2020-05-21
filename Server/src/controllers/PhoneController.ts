import { Request, Response } from 'express';
import pool from '../database'

class PhoneController {
    public async load(req: Request, res: Response){
        const phone = await pool.then((r:any) => r.query('SELECT * FROM Phone'));
        res.json(phone);
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Phone SET ?', [req.body]));
            res.json({text: "The phone was saved"});
        }catch(err){
            res.json({text: "Error" + err.message});
        }
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from phoneController'});
    }
}

export const phoneController = new PhoneController();