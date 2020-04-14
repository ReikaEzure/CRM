import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoute from './routes/IndexRoute';

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
    }

}

const server = new Server();
server.start();