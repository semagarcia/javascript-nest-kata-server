import { Module } from 'nest.js';
import { LoginController } from './login.controller';

@Module({
    controllers: [ LoginController ],
    /*modules: [ SharedModule ],
    controllers: [ UsersController ],
    components: [ UsersService ],
    exports: [ UsersService ],*/
})
export class LoginModule {}