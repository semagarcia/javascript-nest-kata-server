import { Module } from 'nest.js';
import { IndividualKataController } from './individual.controller';
import { IndividualKataService } from './individual.component';
import { CoreModule } from './../core';

@Module({
    modules: [ CoreModule ],
    controllers: [ IndividualKataController ],
    components: [ IndividualKataService ],
    exports: [ IndividualKataService ]
})
export class IndividualKataModule {}