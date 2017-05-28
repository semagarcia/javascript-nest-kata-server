import { Module } from 'nest.js';
import { RankingController } from './ranking.controller';
import { KatasModule } from './../katas/katas.module';

@Module({
    modules: [KatasModule],
    controllers: [ RankingController ],
    components: [],
    exports: []
})
export class RankingModule {}