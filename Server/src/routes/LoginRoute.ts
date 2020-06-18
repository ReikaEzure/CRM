import { Router } from 'express';
import { loginController } from '../controllers/LoginController';

class LoginRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', loginController.test);
        this.router.post('/', loginController.login);
        this.router.get('/:id', loginController.getLogin);
        this.router.put('/reset/:id', loginController.resetPassword);
        this.router.post('/register', loginController.register);
    }

}

const loginRoute = new LoginRoute();
export default loginRoute.router;