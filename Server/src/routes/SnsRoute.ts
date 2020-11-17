import { Router } from 'express';
import { snsController } from '../controllers/SnsController';

class SnsRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', snsController.test);
        this.router.get('/', snsController.load);
        this.router.post('/', snsController.create);
        this.router.get('/:id', snsController.getForOne);
    }

}

const snsRoute = new SnsRoute();
export default snsRoute.router;