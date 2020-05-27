import { Router } from 'express';
import { personalityTypeController } from '../controllers/PersonalityTypeController';

class PersonalityTypeRoute {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test', personalityTypeController.test);
        this.router.get('/', personalityTypeController.load);
    }

}

const personalityTypeRoute = new PersonalityTypeRoute();
export default personalityTypeRoute.router;