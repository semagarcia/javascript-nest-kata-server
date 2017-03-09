import { Module } from 'nest.js';
import { UserController } from './user.controller';

@Module({
    controllers: [ UserController ],
    components: [],
    exports: []
})
export class UserModule {}