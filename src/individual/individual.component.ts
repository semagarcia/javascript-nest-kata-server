import { Component, HttpException } from 'nest.js';
import { Kata, KataModel } from './../schemas/Kata';
const fs = require('fs');

@Component()
export class IndividualKataService {

    getRandomIndividualKata(): Promise<Kata> {
        return new Promise((resolve, reject) => {
            KataModel.count({ enabled: true }, (err, count) => {
                let random = Math.floor(Math.random() * count);
                KataModel.findOne({ enabled: true }).skip(random).exec((err, randomKata: Kata) => {
                    if(err) reject(`Error RandomKata: ${err}`);
                    resolve(randomKata);
                });
            });
        });
    }

}