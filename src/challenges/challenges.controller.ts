import { RequestMethod, Controller, RequestMapping } from 'nest.js';
import { ChallengesService } from './challenges.service';
const uuidV4 = require('node-uuid');

@Controller({ path: 'api/challenges' })
export class ChallengesController {

    constructor(private challengeSrv:ChallengesService) {}

    // Path: /api/challenges
    @RequestMapping({ path: '', method: RequestMethod.GET })
    async getChallenges(req, res) { 
        let challenges = await this.challengeSrv.getChallenges();
        res.send({ challenges:Array.from(challenges) });
    }

    // Path: /api/challenges/challenge/:challengeId
    @RequestMapping({ path: 'challenge/:challengeId', method: RequestMethod.GET })
    async getChallenge(req, res) { 
        let challenge = await this.challengeSrv.getChallenge(req.params.challengeId);
        res.send({ challenge: challenge });
    }

    // Path: /api/challenges/create
    @RequestMapping({ path: 'create', method: RequestMethod.POST })
    async createChallengeId(req, res) { 
        let uuid = uuidV4();
        await this.challengeSrv.createNewChallenge(uuid, req.body.playerId);
        res.send({ uuid: uuid });
    }

    // Path: /api/challenges/check-challenge-id/:challengeId
    @RequestMapping({ path: 'check-challenge-id/:challengeId', method: RequestMethod.GET })
    async checkChallengeId(req, res) { 
        let existsChallengeId = await this.challengeSrv.checkChallengeId(req.params.challengeId);
        res.send({ exists:existsChallengeId });
    }

    // Path: /api/challenges/join
    @RequestMapping({ path: 'join', method: RequestMethod.POST })
    async joinToChallengeRoom(req, res) { 
        let challenge = await this.challengeSrv.joinPlayerIntoChallenge(req.body.challengeId, req.body.playerId);
        console.log('Challenge: ', challenge);
        res.send(challenge);
    }

}