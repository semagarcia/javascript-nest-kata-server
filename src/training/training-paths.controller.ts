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

    // Path: /api/training-paths/exercises/:path
    @RequestMapping({ path: 'exercises/:path', method: RequestMethod.GET })
    async getExercisesOfTrainingPath(req, res) { 
        let exercises = await this.trainingSrv.getExercisesOfTrainingPath(req.params.path);
        res.send({ exercises: exercises });
    }

    // Path: /api/training-paths/metadata/
    @RequestMapping({ path: 'metadata', method: RequestMethod.GET })
    async getAllTrainingPathsMetadata(req, res) { 
        let metadata = await this.trainingSrv.getAllTrainingPathsMetadata();
        res.send({ metadata: metadata });
    }

    // Path: /api/training-paths/metadata/:path/:kataId
    @RequestMapping({ path: 'metadata/:path/:kataId', method: RequestMethod.GET })
    async getMetadataOfTrainingPath(req, res) { 
        let metadata = await this.trainingSrv.getMetadataOfTrainingPath(req.params.path);
        res.send({ metadata: metadata });
    }

}