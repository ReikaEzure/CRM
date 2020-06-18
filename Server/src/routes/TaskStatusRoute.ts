import { Router } from 'express';
import { taskStatusController } from '../controllers/TaskStatusController';

class TaskStatusRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', taskStatusController.test);
        this.router.get('/', taskStatusController.load);
        
    }
}

const taskStatusRoute = new TaskStatusRoute();
export default taskStatusRoute.router;