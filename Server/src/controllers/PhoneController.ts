import { Request, Response } from 'express';
import pool from '../database'

class PhoneController {
    public async load(req: Request, res: Response){
        const phone = await pool.then((r:any) => r.query('SELECT * FROM Phone'));
        res.json(phone);
    }

    public async getForOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const phone = await pool.then((r:any) => r.query('SELECT * FROM Phone WHERE client_idClient = ?', [id]));
        
        if(phone.length > 0){
            return res.json (phone);
        }
        res.status(404).json({text: "The appointment does not exist"});
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

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('DELETE FROM Phone WHERE client_idClient = ?', [id]));
        res.json({text: "The phone was deleted"+req.params.id});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from phoneController'});
    }
}

export const phoneController = new PhoneController();