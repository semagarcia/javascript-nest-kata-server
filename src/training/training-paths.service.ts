import { Component } from 'nest.js';
import { TrainingPath } from './training-paths.model';
const catalogue = require('./kata-catalogue.json');

@Component()
export class TrainingService {

    private trainingPaths: Array<TrainingPath>;

    getTrainingPaths(): Promise<Array<TrainingPath>> {
        return Promise.resolve([
            { trainingPathId: 'basic-types', trainingPathName: 'Basic types & Variables', trainingPathDescription: 'In this basic types path lorem ipsum...' },
            { trainingPathId: 'functions', trainingPathName: 'Functions', trainingPathDescription: 'In this function path lorem ipsum...' },
            { trainingPathId: 'scope-and-closures', trainingPathName: 'Scope & Closures', trainingPathDescription: 'In scope & closures path lorem ipsum...' },
            { trainingPathId: 'arrays', trainingPathName: 'Working with arrays', trainingPathDescription: 'In this arrays path lorem ipsum...' },
            { trainingPathId: 'strings', trainingPathName: 'Working with strings', trainingPathDescription: 'In this strings path lorem ipsum...' },
            { trainingPathId: 'async-js', trainingPathName: 'Asynchronous JS', trainingPathDescription: 'In this asynchronous path lorem ipsum...' },
            { trainingPathId: 'es6', trainingPathName: 'Working with ES6', trainingPathDescription: 'In this ES6 path lorem ipsum...' }
        ]);
    }

    getExercisesOfTrainingPath(path: string): Promise<any> {
        return Promise.resolve(catalogue[path]);
    }

}