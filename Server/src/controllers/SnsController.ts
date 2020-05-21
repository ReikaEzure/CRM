import { Request, Response } from 'express';
import pool from '../database'

class SnsController {
    public async load(req: Request, res: Response){
        const sns = await pool.then((r:any) => r.query('SELECT * FROM SNS'));
        res.json(sns);
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO SNS SET ?', [req.body]));
            res.json({text: "The sns was saved"});
        }catch(err){
            res.json({text: "Error" + err.message});
        }
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from snsController'});
    }
}

export const snsController = new SnsController();