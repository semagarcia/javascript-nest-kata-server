import { Component } from 'nest.js';
const { VM } = require('vm2');

import { Kata, KataModel } from './../schemas/Kata';
import { KataStats, KataStatsModel } from './../schemas/Statistics';

@Component()
export class KatasService {

    /**
     * Endpoint to return all the katas
     */
    async getAllKatas() {
        return new Promise((resolve, reject) => {
            KataModel.find({ enabled: true }).exec((err, katas) => {
                if(err) reject(err);
                resolve(katas);
            });
        });
    }

    /**
     * Endpoint to retrieve a kata
     */
    async getKataById(kataId: string) {
        return new Promise((resolve, reject) => {
            KataModel.findById({ _id: kataId, enabled: true }).exec((err, kata) => {
                if(err) reject(err);
                resolve(kata);
            });
        });
    }

    /**
     * Endpoint to return all stats of the katas
     */
    async getAllKatasStatistics() {
        return new Promise((resolve, reject) => {
            KataStatsModel.find(
                { event: 'JSDayES2017' }, 
                { username: 1, totalTime: 1, stats: 1, _id: 0 }
            ).exec((err, stats) => {
                if(err) reject(err);

                let groupStats = [];
                stats.forEach((stat) => {
                    groupStats.push({
                        username: stat.username,
                        totalTime: stat.totalTime,
                        numOfKatas: stat.stats.length,
                        numOfAttemps: stat.stats.reduce((total, current) => { return total + current.attemps; }, 0),
                        passed: stat.stats.filter((statResult) => { return statResult.status }).length,
                        failed: stat.stats.filter((statResult) => { return !statResult.status }).length
                    });
                });
                resolve(groupStats);
            });
        });
    }

    /**
     * Endpoint to execute the tests of a kata
     */
    async executeTest(kataFunction: string, kataName: string) {
        return new Promise(async(resolve, reject) => {       
            let log;
            const vm = new VM({
                timeout: 4000,
                sandbox: {
                    deepEqual: require('assert').deepEqual,
                    console: {
                        log: (...args) => args.forEach(arg => log += JSON.stringify(arg) + "\n")
                    }
                }
            });

            var kata = require(`./../../katas/${kataName}/kata.js`);
            var tests = kata.tests;
            for(var test of tests) {
                log = '';
                try {
                    vm.run(`
                        ${kataFunction}
                        deepEqual(${kataName}(${test.input}), ${test.output})
                    `);
                    test['result'] = true;
                    delete test.message;
                } catch(err) {
                    test['result'] = false;
                    test['message'] = err.toString();
                    console.log(' ===> Failed to execute due to: ', err);
                }
                test['log'] = log;
            }               
            resolve({
                executionResult: tests.every(test => test['result']),
                output: tests
            });
        });
    }

    /**
     * Endpoint to 
     */
    async updateKataStatistics(statistics: any, username: string, email: string) {
        return new Promise((resolve, reject) => {
            KataStatsModel.findOne({ username: username })
            .then((stats: KataStats) => {
                if(stats) {
                    let found = false;
                    // Search if there is another previous try
                    stats.stats.forEach((kata) => {
                        if(kata.kata === statistics.kata) {
                            kata.time = statistics.time;
                            kata.attemps = statistics.attemps;
                            kata.status = statistics.status;
                            found = true;
                        }
                    });

                    // kata not found (not made yet); add it
                    if(!found) {
                        stats.stats.push({
                            kata: statistics.kata,
                            status: statistics.status,
                            attemps: statistics.attemps,
                            time: statistics.time
                        });
                    }

                    // Update total time and save
                    stats.totalTime += statistics.time;
                    stats.save((err, savedStats) => {
                        if(err) reject(err);
                        resolve(true);
                    });
                } else {
                    // The user has never made an attemp
                    KataStatsModel.create({
                        username: username,
                        email: email,
                        event: 'JSDayES2017',
                        stats: [{
                            kata: statistics.kata,
                            status: statistics.status,
                            attemps: statistics.attemps,
                            time: statistics.time
                        }],
                        totalTime: statistics.time
                    });
                    resolve(true);
                }
            })
            .catch((err) => reject(err))
        });
    }

}