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
        this.router.post('/employee', userController.createEmployee);
        this.router.post('/client', userController.createClient);
        this.router.put('/:id', userController.update);
        this.router.put('/employee/:id', userController.updateEmployee);
        this.router.put('/client/:id', userController.updateClient);
        this.router.put('/changeAvatar/:id', userController.changeAvatar)
        this.router.get('/login/:id', userController.login);
        this.router.get('/logout/:id', userController.logout);
    }

}

const userRoute = new UserRoute();
export default userRoute.router;