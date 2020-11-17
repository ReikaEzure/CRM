import { Request, Response } from 'express';
import pool from '../database'

class AddressController {
    public async load(req: Request, res: Response){
        const address = await pool.then((r:any) => r.query('SELECT * FROM Address'));
        res.json(address);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const address = await pool.then((r:any) => r.query('SELECT * FROM Address WHERE client_idClient = ?', [id]));
        
        if(address.length > 0){
            return res.json (address[0]);
        }
        res.status(404).json({text: "The address does not exist"});
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Address SET ?', [req.body]));
            res.json({text: "The address was saved"});
        }catch(err){
            res.json({text: "Error" + err.message});
        }
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from addressController'});
    }
}

export const addressController = new AddressController();