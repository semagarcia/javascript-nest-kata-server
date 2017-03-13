import { Module, MiddlewareBuilder, RequestMethod } from 'nest.js';

import { AdministrationModule } from './administration';
import { ChallengesModule } from './challenges';
import { CoreModule, CorsMiddleware } from './core';
import { LoginModule } from './login';
import { RankingModule } from './ranking';
import { StreamingModule } from './streaming';
import { UserModule } from './user';

@Module({
    modules: [
        AdministrationModule,
        ChallengesModule,
        CoreModule,
        LoginModule,
        RankingModule,
        StreamingModule,
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