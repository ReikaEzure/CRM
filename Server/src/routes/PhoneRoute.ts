import { Router } from 'express';
import { phoneController } from '../controllers/PhoneController';

class PhoneRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', phoneController.test);
        this.router.get('/', phoneController.load);
        this.router.post('/', phoneController.create);
        this.router.get('/:id', phoneController.getForOne);
    }

}

const phoneRoute = new PhoneRoute();
export default phoneRoute.router;