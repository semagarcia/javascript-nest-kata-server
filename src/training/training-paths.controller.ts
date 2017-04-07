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

    // Path: /api/training-paths/metadata/:path
    @RequestMapping({ path: 'metadata/:path', method: RequestMethod.GET })
    async getMetadataOfTrainingPath(req, res) { 
        let metadata = await this.trainingSrv.getMetadataOfTrainingPath(req.params.path);
        res.send({ metadata: metadata });
    }

    // Path: /api/training-paths/topic/:path
    @RequestMapping({ path: 'topic/:topic', method: RequestMethod.GET })
    async getTrainingPathByTopic(req, res) { 
        let tPath = await this.trainingSrv.getTrainingPathByTopic(req.params.topic);
        res.send({ tPath: tPath });
    }

    // Path: /api/training-paths/exercises/:path
    @RequestMapping({ path: 'exercises/topic/:topic', method: RequestMethod.GET })
    async getExercisesByTopic(req, res) { 
        let exercises = await this.trainingSrv.getExercisesByTopic(req.params.topic);
        res.send({ exercises: exercises });
    }

}