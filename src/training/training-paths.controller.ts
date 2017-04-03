import { RequestMethod, Controller, RequestMapping } from 'nest.js';
import { TrainingService } from './training-paths.service';

@Controller({ path: 'api/training-paths' })
export class TrainingPathsController {

    constructor(private trainingSrv: TrainingService) {}

    // Path: /api/training-paths
    @RequestMapping({ path: '', method: RequestMethod.GET })
    async getTrainingPaths(req, res) { 
        let trainingPaths = await this.trainingSrv.getTrainingPaths();
        res.send({ trainingPaths: trainingPaths });
    }

    // Path: /api/training-paths/:path
    @RequestMapping({ path: ':path', method: RequestMethod.GET })
    async getExercisesOfTrainingPath(req, res) { 
        let pathExercises = await this.trainingSrv.getExercisesOfTrainingPath(req.params.path);
        res.send({ trainingPaths: pathExercises });
    }

}