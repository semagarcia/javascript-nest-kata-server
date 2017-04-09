import { NestApplication } from 'nest.js';
const mongoose = require('mongoose');

import * as bodyParser from 'body-parser';
import * as cors from 'cors';

export class Application implements NestApplication {

    constructor(private expressApp) {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(cors());
    }

    start(): void {
        this.connectToDatabase();
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