import { Router } from 'express';
import { projectStatusController } from '../controllers/ProjectStatusController';

class ProjectStatusRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', projectStatusController.test);
        this.router.get('/', projectStatusController.load);
        
    }
}

const projectStatusRoute = new ProjectStatusRoute();
export default projectStatusRoute.router;