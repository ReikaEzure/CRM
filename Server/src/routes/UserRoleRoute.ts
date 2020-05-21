import { Router } from 'express';
import { userRoleController } from '../controllers/UserRoleController';

class UserRoleRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', userRoleController.test);
        this.router.get('/', userRoleController.load);
    }

}

const userRoleRoute = new UserRoleRoute();
export default userRoleRoute.router;