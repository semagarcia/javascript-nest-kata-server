import { Module } from 'nest.js';
import { EventsController } from './events.controller';

@Module({
    controllers: [ EventsController ],
    components: [],
    exports: []
})
export class EventsModule {}