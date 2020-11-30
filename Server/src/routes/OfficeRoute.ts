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
        this.router.get('/:id', officeController.getOne);
        this.router.post('/', officeController.create);
        this.router.put('/:id', officeController.update);
        this.router.delete('/:id', officeController.delete);
        
    }

}

const officeRoute = new OfficeRoute();
export default officeRoute.router;