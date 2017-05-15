import { Module, MiddlewareBuilder, RequestMethod } from 'nest.js';

import { AdministrationModule } from './administration';
import { ChallengesModule } from './challenges';
import { CoreModule, CorsMiddleware } from './core';
import { IndividualKataModule } from './individual';
import { KatasModule } from './katas';
import { LoginModule } from './login';
import { RankingModule } from './ranking';
import { StreamingModule } from './streaming';
import { TrainingPathsModule } from './training';
import { UserModule } from './user';

@Module({
    modules: [
        AdministrationModule,
        ChallengesModule,
        CoreModule,
        IndividualKataModule,
        KatasModule,
        LoginModule,
        RankingModule,
        StreamingModule,
        TrainingPathsModule,
        UserModule
    ]
})
export class RootModule {
    /*configure(builder: MiddlewareBuilder) {
        builder.use({
            middlewares: [ CorsMiddleware ],
            forRoutes: [ { path: '*', method: RequestMethod.ALL } ]
        })
    }*/
}