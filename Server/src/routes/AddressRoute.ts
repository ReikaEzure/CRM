import { Router } from 'express';
import { addressController } from '../controllers/AddressController';

class AddressRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', addressController.test);
        this.router.get('/', addressController.load);
        this.router.post('/', addressController.create);
    }

}

const addressRoute = new AddressRoute();
export default addressRoute.router;