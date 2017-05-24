import { Component } from 'nest.js';
import { Challenge } from './challenge.model';
const uuidV4 = require('node-uuid');

@Component()
export class ChallengesService {

    private challengesInfo: Map<string, Challenge> = new Map<string, Challenge>();

    getChallenges(): Promise<Map<string, Challenge>> {
        return Promise.resolve(this.challengesInfo);
    }

    getChallenge(challengeId: string): Promise<Challenge> {
        return Promise.resolve(this.challengesInfo.get(challengeId));
    }

    createNewChallenge(playerId: string, direction: string, duration: number, mode: string, event: string): Promise<string> {
        let challengeUUID = uuidV4().slice(0, 8);  // Save only the first 8 characters
        this.challengesInfo.set(challengeUUID, new Challenge(challengeUUID, playerId, direction, duration, mode, event));
        return Promise.resolve(challengeUUID);
    }

    checkChallengeId(challengeId:string): Promise<boolean> {
        return Promise.resolve(this.challengesInfo.has(challengeId));
    }

    joinPlayerIntoChallenge(challengeId: string, playerId: string) {
        let challenge = this.challengesInfo.get(challengeId);
        if(!challenge.playerA && !challenge.playerB) {
            // Nobody has joined into challenge
            challenge.playerA = playerId;
            this.challengesInfo.set(challengeId, challenge);
        } else if(challenge.playerA && !challenge.playerB) {
            // Only playerA has joined into challenge
            challenge.playerB = playerId;
            this.challengesInfo.set(challengeId, challenge);
        } else if(challenge.playerA && challenge.playerB) {
            // Both players have joined into challenge
            console.log('JoinPlayer :: No more players allowed => Exception');
            // Throw exception
        }
        return Promise.resolve(challenge);
    }

}