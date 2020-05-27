import { Request, Response } from 'express';
import pool from '../database'

class PersonalityTypeController {
    public async load(req: Request, res: Response){
        const personalityType = await pool.then((r:any) => r.query('SELECT * FROM PersonalityType'));
        res.json(personalityType);
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from PersonalityTypeController'});
    }
}

export const personalityTypeController = new PersonalityTypeController();