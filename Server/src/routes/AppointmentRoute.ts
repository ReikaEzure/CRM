import { Router } from 'express';
import { appointmentController } from '../controllers/AppointmentController';

class AppointmentRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', appointmentController.test);
        this.router.get('/', appointmentController.list);
        this.router.get('/:id', appointmentController.getOne);
        this.router.post('/', appointmentController.create);
        this.router.put('/:id', appointmentController.update);
        this.router.delete('/:id', appointmentController.delete);
        
    }
}

const appointmentRoute = new AppointmentRoute();
export default appointmentRoute.router;