'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/users/user.routes.js';
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/opinionsManager/v1/users'; 
        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(helmet());
    }
    
    routes(){
        this.app.use(this.userPath, userRoutes);
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Server running in port', this.port);
        })
    }
}

export default Server;