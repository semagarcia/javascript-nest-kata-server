import { Module } from 'nest.js';
import { AdminController } from './admin.controller';

@Module({
    controllers: [ AdminController ],
    components: [],
    exports: []
})
export class AdministrationModule {}