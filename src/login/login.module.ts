import { Module } from 'nest.js';
import { LoginController } from './login.controller';
import { LoginService } from './login.component';
import { CoreModule } from './../core';

@Module({
    modules: [ CoreModule ],
    controllers: [ LoginController ],
    components: [ LoginService ],
    exports: [ LoginService ]
})
export class LoginModule {}