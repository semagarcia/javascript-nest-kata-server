import { Module } from 'nest.js';
import { TrainingPathsController } from './training-paths.controller';
import { TrainingService } from './training-paths.service';

@Module({
    controllers: [ TrainingPathsController ],
    components: [ TrainingService ],
    exports: [ TrainingService ]
})
export class TrainingPathsModule {}