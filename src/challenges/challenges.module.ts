import { Module } from 'nest.js';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';

@Module({
    controllers: [ ChallengesController ],
    components: [ ChallengesService ],
    exports: [ ChallengesService ]
})
export class ChallengesModule {}