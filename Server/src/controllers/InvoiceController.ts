import {Request, Response} from 'express';

import pool from '../database';

class InvoiceController{
    public async list(req: Request, res: Response){
        const inv = await pool.then((r:any) => r.query('SELECT * FROM Invoice'));
        res.json(inv);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const inv = await pool.then((r:any) => r.query('SELECT * FROM Invoice WHERE project_idProject = ?', [id]));
        
        if(inv.length > 0){
            return res.json (inv[0]);
        }
        res.status(404).json({text: "The Invoice does not exist"});
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Invoice SET ?', [req.body]));
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('DELETE FROM Invoice WHERE idInvoice = ?', [id]));
        res.json({text: "The Invoice was deleted"+req.params.id});
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE Invoice set ? WHERE idInvoice = ?', [req.body, id]));
        res.json({text: "The Invoice was updated"+req.params.id});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from InvoiceController'});
    }
}

export const invoiceController = new InvoiceController();