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
        this.router.get('/byId/:id', userController.getUserById);
        this.router.post('/register', userController.register);
        this.router.put('/:id', userController.update);
        this.router.get('/login/:id', userController.login);
        this.router.get('/logout/:id', userController.logout);
    }

}

const userRoute = new UserRoute();
export default userRoute.router;