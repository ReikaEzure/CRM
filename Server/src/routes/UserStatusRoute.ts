import { Router } from 'express';
import { userStatusController } from '../controllers/UserStatusController';

class UserStatusRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', userStatusController.test);
        this.router.get('/', userStatusController.load);
    }

}

const userStatusRoute = new UserStatusRoute();
export default userStatusRoute.router;