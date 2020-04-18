import { Router } from 'express';
import { loginController } from '../controllers/LoginController';

class LoginRoute {

    public router: Router = Router();

    constructor(){
        
    }

    config(): void{
        this.router.post('/', loginController.login);
    }

}

const loginRoute = new LoginRoute();
export default loginRoute.router;