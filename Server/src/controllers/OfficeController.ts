import { Request, Response } from 'express';
import pool from '../database'

class OfficeController {
    public async load(req: Request, res: Response){
        const office = await pool.then((r:any) => r.query('SELECT * FROM Office'));
        res.json(office);
    }
    
    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const office = await pool.then((r:any) => 
            r.query('SELECT o.idOffice, o.name, o.phone, o.nif '+
                    'FROM Office o '+
                    'JOIN Employee emp ON o.idOffice = emp.office_idOffice '+
                    'Where emp.user_idUser = ?;', [id]));
        
        if(office.length > 0){
            return res.json (office[0]);
        }
        res.status(404).json({text: "The office does not exist"});
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Office SET ?', [req.body]));
            const lastInserted = await pool.then((r:any) => r.query('SELECT * from Office WHERE name = ? AND nif = ? AND phone = ?', [req.body.name, req.body.nif, req.body.phone]));
            res.json(lastInserted);
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('DELETE FROM Office WHERE idOffice = ?', [id]));
        res.json({text: "The office was deleted"+req.params.id});
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE Office set ? WHERE idOffice = ?', [req.body, id]));
        res.json({text: "The office was updated"+req.params.id});
    }


    public test(req: Request, res: Response){
        res.json({text: 'Hi! from officeController'});
    }
}

export const officeController = new OfficeController();