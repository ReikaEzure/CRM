import { Router } from 'express';
import { teamController } from '../controllers/TeamController';

class TeamRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', teamController.test);
        this.router.get('/', teamController.list);
        this.router.get('/:id', teamController.getOne);
        this.router.post('/', teamController.create);
        this.router.put('/:id', teamController.update);
        this.router.delete('/:id', teamController.delete);
        
    }
}

const teamRoute = new TeamRoute();
export default teamRoute.router;