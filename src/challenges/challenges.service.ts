import { Component } from 'nest.js';
import { IndividualKataService } from './../individual';
import { Challenge, ChallengeModel } from './../schemas/Challenge';

const uuidV4 = require('node-uuid');
const moment = require('moment');

@Component()
export class ChallengesService {

    constructor(private individualKataSrv: IndividualKataService) {}

    getChallenges(): Promise<Map<string, Challenge>> {
        return new Promise((resolve, reject) => {
            ChallengeModel.find({ 
                'created_at': { 
                    '$gte': moment().subtract(24, 'hours').toDate() 
                } 
            }).exec((err, challenges) => {
                if(err) reject(err);
                resolve(challenges)
            });
        });
    }

    getChallenge(challengeId: string): Promise<Challenge> {
        return new Promise((resolve, reject) => {
            ChallengeModel.findOne({ challengeId: challengeId }, {}, (err, challenge) => {
                if(err) reject(err);
                resolve((challenge) ? challenge : {});
            });
        });
    }

    createNewChallenge(playerSocketId: string, direction: string, duration: number, mode: string, event: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let challengeUUID = uuidV4().slice(0, 8);  // Save only the first 8 characters
            
            this.individualKataSrv.getRandomIndividualKata()
                .then((randomKata) => {
                    ChallengeModel.create({
                        challengeId: challengeUUID,
                        direction: direction,
                        duration: duration,
                        mode: mode,
                        event: event,
                        creator: playerSocketId,
                        challengeKata: randomKata._id
                    }, (err, challenge) => {
                        if(err) reject(err);
                        resolve(challengeUUID);
                    });
                })
                .catch((err) => { 
                    console.log(`Error assigning kata for challenge (${err})`);
                    reject(`Error assigning kata for challenge (${err})`);
                });
        });
    }

    checkChallengeId(challengeId:string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            ChallengeModel.findOne({ challengeId: challengeId }, {}, (err, challenge) => {
                if(err) reject(err);
                resolve(true);
            });
        });
    }

    joinPlayerIntoChallenge(challengeId: string, username: string, playerId: string) {
        return new Promise((resolve, reject) => {
            ChallengeModel.findOne({ challengeId: challengeId }, (err, challenge) => {
                if(err) reject(err);
                if(challenge && challenge.status !== 'WAITING') {
                    // Playing or not valid challenge (expired or ended); please, create a new one
                    console.log('playing or not valid challenge');
                    reject(false);
                } else if(challenge && challenge.status === 'WAITING' && !challenge.playerA) {  
                    challenge.status = 'WAITING';
                    challenge.playerA = playerId;
                    challenge.usernamePlayerA = username;
                    console.log('PlayerA joined');
                    this.saveChallengeUpdate(challenge, resolve, reject);
                } else if(challenge && challenge.status === 'WAITING' && challenge.playerA && !challenge.playerB) {
                    // Allow more than one player??????????????
                    challenge.status = 'PLAYING';
                    challenge.playerB = playerId;
                    challenge.usernamePlayerB = username;
                    console.log('PlayerB joined');
                    //this.streamingGtw.startSyncChallenge(challenge.challengeId, 'playerB has joined into challenge');
                    this.saveChallengeUpdate(challenge, resolve, reject);
                } else 
                    reject(false);
            })
        });
    }

    private saveChallengeUpdate(c, rs, rj) {
        c.save((err, c, nRows) => {
            if(err) rj(err);
            if(c && nRows === 1) 
                rs(c);
            else 
                rs(false);
        });
    }

}