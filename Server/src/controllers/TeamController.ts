import {Request, Response} from 'express';

import pool from '../database';

class TeamController{
    public async list(req: Request, res: Response){
        const team = await pool.then((r:any) => r.query('SELECT * FROM Team'));
        res.json(team);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const team = await pool.then((r:any) => r.query('SELECT * FROM Team WHERE project_idProject = ?', [id]));
        
        if(team.length > 0){
            return res.json (team);
        }
        res.status(404).json({text: "The Team does not exist"});
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Team SET ?', [req.body]));
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('DELETE FROM Team WHERE idTask = ?', [id]));
        res.json({text: "The Team was deleted"+req.params.id});
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE Team set ? WHERE idTeam = ?', [req.body, id]));
        res.json({text: "The Team was updated"+req.params.id});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from TeamController'});
    }
}

export const teamController = new TeamController();