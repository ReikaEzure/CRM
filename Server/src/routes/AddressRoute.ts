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
        this.router.put('/:id', addressController.update);
        this.router.get('/:id', addressController.getOne);
    }

}

const addressRoute = new AddressRoute();
export default addressRoute.router;