import {Request, Response} from 'express';

import pool from '../database';

class AppointmentController{
    public async list(req: Request, res: Response){
        const appointment = await pool.then((r:any) => r.query('SELECT * FROM Appointment'));
        res.json(appointment);
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