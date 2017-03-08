import { NestApplication } from 'nest.js';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

export class Application implements NestApplication {

    constructor(private expressApp) {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(cors());
    }

    start(): void {
        this.expressApp.listen(3000, this.listen);
    }

    private listen(): void {
        console.log('Application listen on port:', 3000);
    }

}