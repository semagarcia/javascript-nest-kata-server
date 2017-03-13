import { Module } from 'nest.js';
import { StreamingGateway } from './streaming.gateway';

@Module({
    components: [ StreamingGateway ],
    exports: [ StreamingGateway ]
})
export class CoreModule {}