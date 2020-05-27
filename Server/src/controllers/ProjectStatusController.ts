import { Request, Response } from 'express';
import pool from '../database'

class ProjectStatusController {
    public async load(req: Request, res: Response){
        const projectStatus = await pool.then((r:any) => r.query('SELECT * FROM ProjectStatus'));
        res.json(projectStatus);
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from ProjectStatusController'});
    }
}

export const projectStatusController = new ProjectStatusController();