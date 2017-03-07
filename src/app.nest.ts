import { NestApplication } from 'nest.js';

export class Application implements NestApplication {
    constructor(private expressApp) {
        // some configuration stuff
    }

    start(): void {
        this.expressApp.listen(3030, this.listen);
    }

    private listen(): void {
        console.log('Application listen on port:', 3030);
    }
}