import { Module } from 'nest.js';
import { RankingController } from './ranking.controller';

@Module({
    controllers: [ RankingController ],
    components: [],
    exports: []
})
export class RankingModule {}