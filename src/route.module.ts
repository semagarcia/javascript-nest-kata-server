import { Module } from 'nest.js';

import { AdministrationModule } from './administration';
import { ChallengesModule } from './challenges';
import { CoreModule } from './core';
import { LoginModule } from './login';
import { RankingModule } from './ranking';
import { SharingModule } from './sharing';
import { UserModule } from './user';

@Module({
    modules: [
        AdministrationModule,
        ChallengesModule,
        CoreModule,
        LoginModule,
        RankingModule,
        SharingModule,
        UserModule
    ]
})
export class RootModule {}