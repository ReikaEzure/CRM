import {Request, Response} from 'express';

import pool from '../database';

class ClientCompanyController{
    public async list(req: Request, res: Response){
        const clients = await pool.then((r:any) => r.query('SELECT * FROM client'));
        res.json(clients);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const client = await pool.then((r:any) => r.query('SELECT * FROM client WHERE idClient = ?', [id]));
        
        if(client.length > 0){
            return res.json (client[0]);
        }
        res.status(404).json({text: "The client does not exist"});
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO client SET ?', [req.body]));
            res.json({text: "The client was saved"});
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('DELETE FROM client WHERE idClient = ?', [id]));
        res.json({text: "The client was deleted"+req.params.id});
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE client set ? WHERE idClient = ?', [req.body, id]));
        res.json({text: "The client was updated"+req.params.id});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from ClientCompanyController'});
    }
}

export const clientCompanyController = new ClientCompanyController();