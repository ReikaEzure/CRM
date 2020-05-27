import {Request, Response} from 'express';

import pool from '../database';

class PromotionController{
    public async list(req: Request, res: Response){
        const promo = await pool.then((r:any) => r.query('SELECT * FROM Promotion'));
        res.json(promo);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const promo = await pool.then((r:any) => r.query('SELECT * FROM Promotion WHERE idPromotion = ?', [id]));
        
        if(promo.length > 0){
            return res.json (promo[0]);
        }
        res.status(404).json({text: "The Promotion does not exist"});
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        try{
            await pool.then((r:any)=>r.query('INSERT INTO Promotion SET ?', [req.body]));
        }catch(err){
            res.json({text: "Error"+err.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('DELETE FROM Promotion WHERE idPromotion = ?', [id]));
        res.json({text: "The Promotion was deleted"+req.params.id});
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.then((r:any)=>r.query('UPDATE Promotion set ? WHERE idPromotion = ?', [req.body, id]));
        res.json({text: "The Promotion was updated"+req.params.id});
    }

    public test(req: Request, res: Response){
        res.json({text: 'Hi! from PromotionController'});
    }
}

export const promotionController = new PromotionController();