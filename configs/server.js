'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/users/user.routes.js';
import loginRoutes from '../src/auth/auth.routes.js';
import publicationRoutes from '../src/publications/publication.routes.js';
import commentRoutes from '../src/comments/comment.routes.js';
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/opinionsManager/v1/users';
        this.loginPath = '/opinionsManager/v1/login';
        this.publicationPath= '/opinionsManager/v1/publications';
        this.commentPath = '/opinionsManager/v1/comments';
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
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }
    
    routes(){
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.loginPath, loginRoutes);
        this.app.use(this.publicationPath, publicationRoutes);
        this.app.use(this.commentPath, commentRoutes);
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Server running in port', this.port);
        });
    }
}

export default Server;