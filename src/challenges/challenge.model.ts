export class Challenge {

    challengeId: string;
    direction: string;
    duration: number;
    mode: string;
    event: string;
    creator: string;
    playerA: string;
    namePlayerA: string;
    playerB: string;
    namePlayerB: string;
    timestamp: Date;
    status: ChallengeStatus;
    result: ChallengeResult;

    constructor(id: string, playerId: string, direction: string, duration: number, mode: string, event?: string) {
        this.challengeId = id;
        this.creator = playerId;
        this.direction = direction;
        this.duration = duration;
        this.mode = mode;
        this.timestamp = new Date();
        this.event = event;
        this.status = ChallengeStatus.WAITING;
    }

}

export enum ChallengeStatus { 'WAITING', 'PLAYING', 'ENDED' };

export class ChallengeResult {

}