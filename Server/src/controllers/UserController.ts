import { Request, Response } from 'express';
import pool from '../database'

class UserController {
    public async getUser(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const user = await pool.then((r:any) => r.query('SELECT * from user WHERE Login_Id = ?', [id]));
        if(user.length > 0){
            return res.json (user);
        }
        res.status(404).json({text: "can't find the user"});
    }

    public async register(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO user SET ?', [req.body]));
            res.json({message: "creating a user"});
        }catch(err){
            res.json({text: "Error" + err.message});
        }
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE games set ? WHERE id = ?', [req.body, id]));
        res.json({text: "updating a game "+req.params.id});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from UserController'});
    }
}

export const userController = new UserController();