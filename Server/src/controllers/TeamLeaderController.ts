import {Request, Response} from 'express';

import pool from '../database';

class TeamLeaderController{
    public async list(req: Request, res: Response){
        const teamLeader = await pool.then((r:any) => r.query('SELECT * FROM TeamLeader'));
        res.json(teamLeader);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const teamLeader = await pool.then((r:any) => r.query('SELECT * FROM TeamLeader WHERE idTeamLeader = ?', [id]));
        
        if(teamLeader.length > 0){
            return res.json (teamLeader[0]);
        }
        res.status(404).json({text: "The TeamLeader does not exist"});
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO TeamLeader SET ?', [req.body]));
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('DELETE FROM TeamLeader WHERE idTask = ?', [id]));
        res.json({text: "The TeamLeader was deleted"+req.params.id});
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE TeamLeader set ? WHERE idTeamLeader = ?', [req.body, id]));
        res.json({text: "The TeamLeader was updated"+req.params.id});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from TeamLeaderController'});
    }
}

export const teamLeaderController = new TeamLeaderController();