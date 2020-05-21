import { Router } from 'express';
import { officeController } from '../controllers/OfficeController';

class OfficeRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', officeController.test);
        this.router.get('/', officeController.load);
    }

}

const officeRoute = new OfficeRoute();
export default officeRoute.router;