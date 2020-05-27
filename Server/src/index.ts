import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoute from './routes/IndexRoute';
import loginRoute from './routes/LoginRoute';
import userRoute from './routes/UserRoute';
import userStatusRoute from './routes/UserStatusRoute';
import userRoleRoute from './routes/UserRoleRoute'
import officeRoute from './routes/OfficeRoute';
import clienteCompanyRoute from './routes/ClienteCompanyRoute';
import phoneRoute from './routes/PhoneRoute';
import addressRoute from './routes/AddressRoute';
import snsRoute from './routes/SnsRoute';
import clientTypeRoute from './routes/ClientTypeRoute';
import appointmentRoute from './routes/AppointmentRoute';
import invoiceRoute from './routes/InvoiceRoute';
import personalityTypeRoute from './routes/PersonalityTypeRoute';
import projectRoute from './routes/ProjectRoute';
import projectStatusRoute from './routes/ProjectStatusRoute';
import promotionRoute from './routes/PromotionRoute';
import taskRoute from './routes/TaskRoute';
import teamLeaderRoute from './routes/TeamLeaderRoute';
import teamRoute from './routes/TeamRoute';

class Server {
    
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.port || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    start(): void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log('Server on port ' + this.app.get('port'));
        });
    }

    routes(): void{
        this.app.use('/', indexRoute);
        this.app.use('/login', loginRoute);
        this.app.use('/user', userRoute);
        this.app.use('/userStatus', userStatusRoute);
        this.app.use('/userRole', userRoleRoute);
        this.app.use('/office', officeRoute);
        this.app.use('/client', clienteCompanyRoute);
        this.app.use('/phone', phoneRoute);
        this.app.use('/address', addressRoute);
        this.app.use('/sns', snsRoute);
        this.app.use('/clientType', clientTypeRoute);
        this.app.use('/appointment', appointmentRoute);
        this.app.use('/invoice', invoiceRoute);
        this.app.use('/personalityType', personalityTypeRoute);
        this.app.use('/project', projectRoute);
        this.app.use('/projectStatus', projectStatusRoute);
        this.app.use('/promotion', promotionRoute);
        this.app.use('/task', taskRoute);
        this.app.use('/teamLeader', teamLeaderRoute);
        this.app.use('/team', teamRoute);
    }

}

const server = new Server();
server.start();