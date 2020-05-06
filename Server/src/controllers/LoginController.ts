import { Request, Response } from 'express';
import pool from '../database'

class LoginController {
    public async login(req: Request, res: Response): Promise<any>{
        const login = await pool.then((r:any) => r.query('SELECT * from login WHERE username = ? AND password = ?', [req.body.username, req.body.password]));
        if(login.length > 0){
            return res.json (login);
        }
        res.status(404).json({text: "The user doesn't exist"});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from logincontroller'});
    }
}

export const loginController = new LoginController();