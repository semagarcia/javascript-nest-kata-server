import { Component } from 'nest.js';

import { Kata, KataModel } from './../schemas/Kata';

@Component()
export class KatasService {

    private katas: Array<Kata>;

    /**
     * Endpoint to receive all the katas
     * Path: /api/katas
     */
    getAllKatas() {
        return new Promise((resolve, reject) => {
            KataModel.find({ enabled: true}).exec((err, katas) => {
                if(err) reject(err);
                resolve(katas);
            });
        });
    }

    /*createNewTrainingPath(topic: string, name: string, description: string) {
        return new Promise((resolve, reject) => {
            let newTrainingPath = new KataModel({

            });
            newTrainingPath.save((err) => {
                if(err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve()
                }
            });
        });
    }*/
}