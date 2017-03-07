import { NestRunner } from 'nest.js';
import { Application } from './src/app.nest';
import { RootModule } from './src/route.module';

NestRunner.run(Application, RootModule);