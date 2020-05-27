import { Router } from 'express';
import { projectController } from '../controllers/ProjectController';

class ProjectRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', projectController.test);
        this.router.get('/', projectController.list);
        this.router.get('/:id', projectController.getOne);
        this.router.post('/', projectController.create);
        this.router.put('/:id', projectController.update);
        this.router.delete('/:id', projectController.delete);
        
    }
}

const projectRoute = new ProjectRoute();
export default projectRoute.router;