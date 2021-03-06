import { Router } from 'express';
import { taskController } from '../controllers/TaskController';

class TaskRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', taskController.test);
        this.router.get('/:id', taskController.list);
        this.router.get('/info/:id', taskController.getOne);
        this.router.post('/', taskController.create);
        this.router.put('/:id', taskController.update);
        this.router.post('/changeStatus', taskController.changeStatus);
        this.router.delete('/:id', taskController.delete);
        
    }
}

const taskRoute = new TaskRoute();
export default taskRoute.router;