import {Request, Response} from 'express';

import pool from '../database';

class TaskController{
    public async list(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const task = await pool.then((r:any) => r.query('SELECT * FROM Task WHERE project_idProject = ?', [id]));
        if(task.length > 0){
            return res.json (task);
        }
        res.status(404).json({text: "Tasks of that project do not exist"});
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const task = await pool.then((r:any) => r.query('SELECT * FROM Task WHERE idTask = ?', [id]));
        
        if(task.length > 0){
            return res.json (task[0]);
        }
        res.status(404).json({text: "The Task does not exist"});
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Task SET ?', [req.body]));
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('DELETE FROM Task WHERE idTask = ?', [id]));
        res.json({text: "The Task was deleted"+req.params.id});
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE Task set ? WHERE idTask = ?', [req.body, id]));
        res.json({text: "The Task was updated"+req.params.id});
    }

    public async changeStatus(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('UPDATE Task set status = ? WHERE idTask = ?', [req.body.status, req.body.id]));
            res.json({text: "The Task status was updated"+req.params.id});
        }catch(err){
            res.json({text: "Error"+err.message});
        }

        
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from TaskController'});
    }
}

export const taskController = new TaskController();