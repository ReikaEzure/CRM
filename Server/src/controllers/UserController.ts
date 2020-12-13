import { Request, Response } from 'express';
import pool from '../database'

class UserController {
    public async getUser(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        console.log(id);
        const user = await pool.then((r:any) => r.query('SELECT * from user WHERE login_IdLogin = ?', [id]));
        if(user.length > 0){
            return res.json (user[0]);
        }
        res.status(404).json({text: "can't find the user"});
    }

    public async getUserById(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        console.log(id);
        const user = await pool.then((r:any) => r.query('SELECT * from user WHERE idUser = ?', [id]));
        if(user.length > 0){
            return res.json (user[0]);
        }
        res.status(404).json({text: "can't find the user"});
    }

    public async getUserByOffice(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        console.log(id);
        try{
            const user = await pool.then((r:any) => 
                        r.query('SELECT u.idUser, u.firstName, u.lastName, l.email, u.status from User u '+
                        'JOIN Login l ON u.login_idLogin = l.idLogin '+
                        'JOIN Employee emp ON u.idUser = emp.user_idUser '+
                        'JOIN Office o ON o.idOffice = emp.office_idOffice '+
                        'where o.idOffice = ?;', [id]));
            return res.json (user);
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async getUserByClient(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        console.log(id);
        try{
        const user = await pool.then((r:any) => 
                    r.query('SELECT u.idUser, u.firstName, u.lastName, l.email, u.status  from User u '+
                    'JOIN Login l ON u.login_idLogin = l.idLogin '+
                    'JOIN Client cli ON u.idUser = cli.user_idUser '+
                    'JOIN ClientCompany cc ON cc.idClient = cli.clientCompany '+
                    'where cc.idClient = ?;', [id]));
            return res.json (user);
        }catch(err){
            res.json({text: "Error"+err.message});
        }
        
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

    public async createEmployee(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Employee SET ?', [req.body]));
            res.json({text: "add an employee: "+req.params.id});
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async createClient(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Client SET ?', [req.body]));
            res.json({text: "add a client: "+req.params.id});
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        try{
            await pool.then((r:any)=>r.query('UPDATE user set ? WHERE idUser = ?', [req.body, id]));
            res.json({text: "updating a user id: "+req.params.id});
        }catch(err){
            res.json({text: "Error" + err.message});
        }
    }

    public async updateEmployee(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        try{
            await pool.then((r:any)=>r.query('UPDATE Employee set ? WHERE user_idUser = ?', [req.body, id]));
            res.json({text: "updating a employee: "+req.params.id});
        }catch(err){
            res.json({text: "Error" + err.message});
        }
    }

    public async updateClient(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        try{
            await pool.then((r:any)=>r.query('UPDATE Client set ? WHERE user_idUser = ?', [req.body, id]));
            res.json({text: "updating a client: "+req.params.id});
        }catch(err){
            res.json({text: "Error" + err.message});
        }
    }

    public async changeAvatar(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        try{
            await pool.then((r:any)=>r.query('UPDATE user set avatar = ? WHERE idUser = ?', [req.body.avatar, id]));
            res.json({text: "Changing avatar of user id: "+req.params.id});
        }catch(err){
            res.json({text: "Error" + err.message});
        }
    }

    public async login(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        try{
            await pool.then((r:any)=>r.query('UPDATE user set status = 1 WHERE login_idLogin = ?', [id]));
            res.json({text: "user id: "+req.params.id+" change status as Working"});
        }catch(err){
            res.json({text: "Error" + err.message});
        }
    }

    public async logout(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        try{
            await pool.then((r:any)=>r.query('UPDATE user set status = 4 WHERE idUser = ?', [id]));
            res.json({text: "user id: "+req.params.id+" logged out successfully"});
        }catch(err){
            res.json({text: "Error" + err.message});
        }
    }

    public async changeStatus(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('UPDATE User set status = ? WHERE idUser = ?', [req.body.status, req.body.id]));
            res.json({text: "User status was updated"+req.params.id});
        }catch(err){
            res.json({text: "Error"+err.message});
        }

        
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from UserController'});
    }
}

export const userController = new UserController();