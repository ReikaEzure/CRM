import { Router } from 'express';
import { clientTypeController } from '../controllers/ClientTypeController';

class ClientTypeRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', clientTypeController.test);
        this.router.get('/', clientTypeController.load);
    }

}

const clientTypeRoute = new ClientTypeRoute();
export default clientTypeRoute.router;