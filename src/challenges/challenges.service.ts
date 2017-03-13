import { Component } from 'nest.js';
import { Challenge } from './challenge.model';

@Component()
export class ChallengesService {

    private challengesInfo: Map<string, Challenge> = new Map<string, Challenge>();

    getChallenges(): Promise<Map<string, Challenge>> {
        return Promise.resolve(this.challengesInfo);
    }

    getChallenge(challengeId: string): Promise<Challenge> {
        return Promise.resolve(this.challengesInfo.get(challengeId));
    }

    createNewChallenge(challengeId: string, playerId: string) {
        this.challengesInfo.set(challengeId, new Challenge(challengeId, playerId));
    }

    checkChallengeId(challengeId:string): Promise<boolean> {
        return Promise.resolve(this.challengesInfo.has(challengeId));
    }

    joinPlayerIntoChallenge(challengeId: string, playerId: string) {
        let challenge = this.challengesInfo.get(challengeId);
        if(!challenge.playerA && !challenge.playerB) {
            // Nobody has joined into challenge
            console.log('JoinPlayer :: 0 players => ', playerId);
            challenge.playerA = playerId;
            this.challengesInfo.set(challengeId, challenge);
        } else if(challenge.playerA && !challenge.playerB) {
            // Only playerA has joined into challenge
            console.log('JoinPlayer :: 1 player => ', playerId);
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