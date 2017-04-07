import { Component } from 'nest.js';
import { KataExercise, KataMetadata, TrainingPath } from './training-paths.model';

import { TrainingPathModel } from './../schemas/TrainingPath';
import { KataModel } from './../schemas/Kata';

//const catalogue: object[] = require('./kata-catalogue.json').trainingPaths;

@Component()
export class TrainingService {

    private trainingPaths: Array<TrainingPath>;

    getTrainingPaths(): Promise<Array<TrainingPath>> {
        return new Promise((resolve, reject) => {
            TrainingPathModel.find({ enabled: true }).exec((err, tPaths) => {
                if(err) { console.log(err); return reject(err); }
                return resolve(tPaths);
            });
        });
    }

    getExercisesOfTrainingPath(pathId: string): Promise<Array<KataExercise>> {
        return new Promise((resolve, reject) => {
            TrainingPathModel.find({ enabled: true }).exec((err, tPaths) => {
                if(err) { console.log(err); return reject(err); }
                KataModel.populate(tPaths, { path: 'katas' }, (err, tPaths) => {
                    if(err) { console.log(err); return reject(err); }
                    return resolve(tPaths);
                });
            });
        });
    }

    getAllTrainingPathsMetadata(): Promise<Array<KataMetadata>> {
        return new Promise((resolve, reject) => {
            TrainingPathModel.find({ enabled: true }, 'id topic description updatedAt').exec((err, metadata) => {
                if(err) { console.log(err); return reject(err); }
                return resolve(metadata);
            });
        });
    }

    getMetadataOfTrainingPath(path: string): Promise<KataMetadata> {
        return new Promise((resolve, reject) => {
            TrainingPathModel.findOne({ id: path, enabled: true }, 'id topic description updatedAt').exec((err, metadata) => {
                if(err) { console.log(err); return reject(err); }
                return resolve(metadata);
            });
        });
    }

    getTrainingPathByTopic(topic: string): Promise<KataMetadata> {
        return new Promise((resolve, reject) => {
            TrainingPathModel.findOne({ topic: topic, enabled: true }, 'id topic description updatedAt').exec((err, metadata) => {
                if(err) { console.log(err); return reject(err); }
                return resolve(metadata);
            });
        });
    }

    getExercisesByTopic(topic: string): Promise<KataMetadata> {
        return new Promise((resolve, reject) => {
            TrainingPathModel.find({ topic: topic, enabled: true }, 'id topic description updatedAt').exec((err, exercises) => {
                if(err) { console.log(err); return reject(err); }
                KataModel.populate(exercises, { path: 'katas' }, (err, tPaths) => {
                    if(err) { console.log(err); return reject(err); }
                    return resolve(exercises);
                });
            });
        });
    }

}