import { Router } from 'express';
import { teamLeaderController } from '../controllers/TeamLeaderController';

class TeamLeaderRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', teamLeaderController.test);
        this.router.get('/', teamLeaderController.list);
        this.router.get('/:id', teamLeaderController.getOne);
        this.router.post('/', teamLeaderController.create);
        this.router.put('/:id', teamLeaderController.update);
        this.router.delete('/:id', teamLeaderController.delete);
        
    }
}

const teamLeaderRoute = new TeamLeaderRoute();
export default teamLeaderRoute.router;