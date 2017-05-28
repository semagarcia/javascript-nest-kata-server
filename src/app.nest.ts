import { NestApplication } from 'nest.js';
const session = require('express-session');
const expressJwt = require('express-jwt');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const config = require('./config.json');

import * as bodyParser from 'body-parser';
import * as cors from 'cors';

export class Application implements NestApplication {

    constructor(private expressApp) {
        this.connectToDatabase();

        // Set/Config middlewares
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(cors());
        this.expressApp.use(session({ 
            secret: config.secretExpress,
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                autoRemove: 'disabled'
            })
        }));
        this.expressApp.use(
            expressJwt({ secret: config.secretJwt })
                .unless({ path: ['/api/login', '/api/events', '/api/ranking', '/api/logout'] })
        );
    }

    start(): void {
        this.expressApp.listen(3000, this.listen);
    }

    private listen(): void {
        console.log('Application listen on port:', 3000);
    }

    private connectToDatabase(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost:27017/kata-player');
    }

}