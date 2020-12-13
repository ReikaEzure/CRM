import { Router } from 'express';
import { clientCompanyController } from '../controllers/ClientCompanyController';

class ClientCompanyRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', clientCompanyController.test);
        this.router.get('/', clientCompanyController.list);
        this.router.get('/:id', clientCompanyController.getOne);
        this.router.get('/byUser/:id', clientCompanyController.getClientCompany);
        this.router.post('/', clientCompanyController.create);
        this.router.put('/:id', clientCompanyController.update);
        this.router.delete('/:id', clientCompanyController.delete);
        
    }
}

const clientCompanyRoute = new ClientCompanyRoute();
export default clientCompanyRoute.router;