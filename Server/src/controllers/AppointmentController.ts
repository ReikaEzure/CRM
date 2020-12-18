import {Request, Response} from 'express';

import pool from '../database';

class AppointmentController{
    public async load(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        try{
        const appointment = await pool.then((r:any) => 
            r.query('SELECT * FROM Appointment app '+
                    'join Appointment_has_User au on app.idAppointment = au.appointment_idAppointment '+
                    'where au.user_idUser = ?', [id]));
        
        return res.json (appointment);
        }catch(err){
            res.status(404).json({text: "The appointment does not exist"});
        }
        
    }

    public async listToday(req: Request, res: Response){
        let today=new Date().toISOString();
        const tomorrow = new Date();
        tomorrow.setHours(23, 59, 59);
        let tmr=tomorrow.toISOString()
        try{
            const appointment = await pool.then((r:any) => r.query("SELECT * FROM Appointment where date > '"+today+"' AND date < '"+tmr+"'"));
            res.json(appointment);
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async listUpcoming(req: Request, res: Response){
        let today=new Date().toISOString();
        try{
            const appointment = await pool.then((r:any) => r.query("SELECT * FROM Appointment where date > '"+today+"'"));
            res.json(appointment);
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async listDone(req: Request, res: Response){
        let today=new Date().toISOString();
        try{
            const appointment = await pool.then((r:any) => r.query("SELECT * FROM Appointment where date <'"+today+"'"));
            res.json(appointment);
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const appointment = await pool.then((r:any) => r.query('SELECT * FROM Appointment WHERE idAppointment = ?', [id]));
        
        if(appointment.length > 0){
            return res.json (appointment[0]);
        }
        res.status(404).json({text: "The appointment does not exist"});
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Appointment SET ?', [req.body]));
            const lastInserted = await pool.then((r:any) => r.query('SELECT * from Appointment WHERE date = ? AND description = ?', [req.body.date, req.body.description]));
            res.json(lastInserted[0]);
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async createAppo(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Appointment_has_User SET ?', [req.body]));
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('DELETE FROM Appointment WHERE idAppointment = ?', [id]));
        res.json({text: "The Appointment was deleted"+req.params.id});
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE Appointment set ? WHERE idAppointment = ?', [req.body, id]));
        res.json({text: "The Appointment was updated"+req.params.id});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from AppointmentController'});
    }
}

export const appointmentController = new AppointmentController();