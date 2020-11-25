import { Request, Response } from 'express';
import pool from '../database'

class LoginController {
    public async login(req: Request, res: Response): Promise<any>{
        const login = await pool.then((r:any) => r.query('SELECT * from login WHERE username = ? AND password = ?', [req.body.username, req.body.password]));
        if(login.length > 0){
            return res.json (login[0]);
        }
        res.status(404).json({text: "The user doesn't exist"});
    }

    public async getLogin(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const login = await pool.then((r:any) => r.query('SELECT * FROM login WHERE idLogin = ?', [id]));
        
        if(login.length > 0){
            return res.json (login[0]);
        }
        res.status(404).json({text: "The login user does not exist"});
    }

    public async getEmail(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        console.log(id);
        const user = await pool.then((r:any) => r.query('SELECT email from Login WHERE idLogin = ?', [id]));
        if(user.length > 0){
            return res.json (user[0]);
        }
        res.status(404).json({text: "can't find the user"});
    }

    public async register(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO login SET ?', [req.body]));
            const lastInserted = await pool.then((r:any) => r.query('SELECT * from login WHERE username = ? AND password = ?', [req.body.username, req.body.password]));
            res.json(lastInserted);
        }catch(err){
            res.json({text: "Error" + err.message});
        }
    }

    public async resetPassword(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE login set ? WHERE idLogin = ?', [req.body, id]));
        res.json({text: "The password was resetted "+req.params.id});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from logincontroller'});
    }
}

export const loginController = new LoginController();