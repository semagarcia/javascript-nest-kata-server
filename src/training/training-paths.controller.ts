import { RequestMethod, Controller, RequestMapping } from 'nest.js';
import { TrainingService } from './training-paths.service';

@Controller({ path: 'api/training-paths' })
export class TrainingPathsController {

    constructor(private trainingSrv: TrainingService) {}

    /**
     * Endpoint to retrieve all the training paths (without katas)
     * Path: /api/training-paths
     */
    @RequestMapping({ path: '', method: RequestMethod.GET })
    async getTrainingPaths(req, res) { 
        let trainingPaths = await this.trainingSrv.getTrainingPathsWithoutKatas();
        res.send({ trainingPaths: trainingPaths });
    }

    /**
     * Endpoint to retrieve all the training paths to populate the grid (settings)
     * Path: /api/training-paths/grid
     */
    @RequestMapping({ path: '/grid', method: RequestMethod.GET })
    async getTrainingPathsForGrid(req, res) { 
        let trainingPaths = await this.trainingSrv.getTrainingPathsForGrid();
        res.send({ trainingPaths: trainingPaths });
    }

    /**
     * Endpoint to retrieve a training path by its topic
     * Path: /api/training-paths/topic/:topic
     */
    @RequestMapping({ path: 'topic/:topic', method: RequestMethod.GET })
    async getTrainingPathByTopic(req, res) { 
        let tPath = await this.trainingSrv.getTrainingPathByTopic(req.params.topic);
        res.send({ tPath: tPath });
    }

    /**
     * Endpoint to retrieve the katas of a training path specified by its topic
     * Path: /api/training-paths/:topic/katas
     */
    @RequestMapping({ path: ':topic/katas', method: RequestMethod.GET })
    async getExercisesOfTrainingPath(req, res) { 
        let katas = await this.trainingSrv.getKatasOfTrainingPathByTopic(req.params.topic);
        res.send({ trainingPath: katas });
    }

    /**
     * Endpoint to
     * Path: /api/training-paths/id/katas/:pathId
     */
    @RequestMapping({ path: 'id/katas/:pathId', method: RequestMethod.GET })
    async getKatasByTrainingPathId(req, res) { 
        let exercises = await this.trainingSrv.getKatasByTrainingPathId(req.params.pathId);
        res.send({ katas: exercises });
    }

}