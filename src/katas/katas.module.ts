import { Module } from 'nest.js';
import { KatasController } from './katas.controller';
import { KatasService } from './katas.service';

@Module({
    controllers: [ KatasController ],
    components: [ KatasService ],
    exports: [ KatasService ]
})
export class KatasModule {}