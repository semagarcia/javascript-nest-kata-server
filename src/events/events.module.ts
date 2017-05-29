import { Module } from 'nest.js';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
    controllers: [ EventsController ],
    components: [ EventsService ],
    exports: [ EventsService ]
})
export class EventsModule {}