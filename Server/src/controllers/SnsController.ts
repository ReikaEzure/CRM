import { Request, Response } from 'express';
import pool from '../database'

class SnsController {
    public async load(req: Request, res: Response){
        const sns = await pool.then((r:any) => r.query('SELECT * FROM SNS'));
        res.json(sns);
    }

    public async getForOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const sns = await pool.then((r:any) => r.query('SELECT * FROM SNS WHERE client_idClient = ?', [id]));
        
        if(sns.length > 0){
            return res.json (sns);
        }
        res.status(404).json({text: "The SNS does not exist"});
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

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('DELETE FROM Sns WHERE client_idClient = ?', [id]));
        res.json({text: "The sns was deleted"+req.params.id});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from snsController'});
    }
}

export const snsController = new SnsController();