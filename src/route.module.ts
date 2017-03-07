import { Module } from 'nest.js';

import { LoginModule } from './login/login.module';

@Module({
    modules: [
        LoginModule
    ]
})
export class RootModule {}