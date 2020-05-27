import { Router } from 'express';
import { invoiceController } from '../controllers/InvoiceController';

class InvoiceRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', invoiceController.test);
        this.router.get('/', invoiceController.list);
        this.router.get('/:id', invoiceController.getOne);
        this.router.post('/', invoiceController.create);
        this.router.put('/:id', invoiceController.update);
        this.router.delete('/:id', invoiceController.delete);
        
    }
}

const invoiceRoute = new InvoiceRoute();
export default invoiceRoute.router;