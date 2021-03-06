import { Module } from 'nest.js';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { IndividualKataService } from './../individual';

@Module({
    controllers: [ ChallengesController ],
    components: [ ChallengesService, IndividualKataService ],
    exports: [ ChallengesService ]
})
export class ChallengesModule {}