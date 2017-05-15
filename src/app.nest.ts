import { NestApplication } from 'nest.js';
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

import * as bodyParser from 'body-parser';
import * as cors from 'cors';

export class Application implements NestApplication {

    constructor(private expressApp) {
        this.connectToDatabase();

        // Set/Config middlewares
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(cors());
        this.expressApp.use(session({ 
            secret: 'JSDayES-2017-event',
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                autoRemove: 'disabled'
            })
        }));
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