import { Router } from 'express';
import { promotionController } from '../controllers/PromotionController';

class PromotionRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', promotionController.test);
        this.router.get('/', promotionController.list);
        this.router.get('/:id', promotionController.getOne);
        this.router.post('/', promotionController.create);
        this.router.put('/:id', promotionController.update);
        this.router.delete('/:id', promotionController.delete);
        
    }
}

const promotionRoute = new PromotionRoute();
export default promotionRoute.router;