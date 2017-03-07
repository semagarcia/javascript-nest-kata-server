import { Module } from 'nest.js';
import { LoginController } from './login.controller';
import { LoginService } from './login.component';

@Module({
    controllers: [ LoginController ],
    components: [ LoginService ],
    exports: [ LoginService ]
})
export class LoginModule {}