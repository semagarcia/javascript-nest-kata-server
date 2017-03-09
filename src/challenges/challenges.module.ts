import { Module } from 'nest.js';
import { ChallengesController } from './challenges.controller';

@Module({
    controllers: [ ChallengesController ],
    components: [],
    exports: []
})
export class ChallengesModule {}