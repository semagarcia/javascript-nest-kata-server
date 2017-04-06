import { Component } from 'nest.js';
import { KataExercise, KataMetadata, TrainingPath } from './training-paths.model';
const catalogue: object[] = require('./kata-catalogue.json').trainingPaths;

@Component()
export class TrainingService {

    private trainingPaths: Array<TrainingPath>;

    getTrainingPaths(): Promise<Array<TrainingPath>> {
        return Promise.resolve(catalogue);

    }

    getExercisesOfTrainingPath(path: string): Promise<Array<KataExercise>> {
        return Promise.resolve(catalogue[path].exercises);
    }

    getAllTrainingPathsMetadata(): Promise<Array<KataMetadata>> {
        let pathMetadata = catalogue.map((path: TrainingPath) => path.metadata);
        return Promise.resolve(pathMetadata);
    }

    getMetadataOfTrainingPath(path: string): Promise<KataMetadata> {
        return Promise.resolve(catalogue[path].metadata);
    }

}