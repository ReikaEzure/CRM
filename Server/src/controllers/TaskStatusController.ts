import { Request, Response } from 'express';
import pool from '../database'

class TaskStatusController {
    public async load(req: Request, res: Response){
        const taskStatus = await pool.then((r:any) => r.query('SELECT * FROM TaskStatus'));
        res.json(taskStatus);
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from TaskStatusController'});
    }
}

export const taskStatusController = new TaskStatusController();