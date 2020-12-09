import {Request, Response} from 'express';

import pool from '../database';

class ProjectController{
    public async list(req: Request, res: Response){
        const project = await pool.then((r:any) => r.query('SELECT * FROM Project'));
        res.json(project);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const project = await pool.then((r:any) => r.query('SELECT * FROM Project WHERE idProject = ?', [id]));
        
        if(project.length > 0){
            return res.json (project[0]);
        }
        res.status(404).json({text: "The Project does not exist"});
    }

    public async getByClient(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try{
            const project = await pool.then((r:any) => r.query('SELECT * FROM Project WHERE client_idClient = ?', [id]));
            res.json(project);
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Project SET ?', [req.body]));
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('DELETE FROM Project WHERE idProject = ?', [id]));
        res.json({text: "The Project was deleted"+req.params.id});
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE Project set ? WHERE idProject = ?', [req.body, id]));
        res.json({text: "The Project was updated"+req.params.id});
    }

    public async modifyPromotion(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE Project set promotion_idPromotion = ? WHERE idProject = ?', [req.body.promoId, id]));
        res.json({text: "The Project was applied promotion"+req.params.id});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from ProjectController'});
    }
}

export const projectController = new ProjectController();