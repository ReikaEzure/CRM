import { Router } from 'express';
import { userController } from '../controllers/UserController';

class UserRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', userController.test);
        this.router.get('/:id', userController.getUser);
        this.router.post('/', userController.create);
        this.router.put('/:id', userController.update);
    }

}

const userRoute = new UserRoute();
export default userRoute.router;