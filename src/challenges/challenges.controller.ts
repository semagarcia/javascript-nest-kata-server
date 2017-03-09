import { RequestMethod, Controller, RequestMapping } from 'nest.js';

@Controller({ path: 'challenges' })
export class ChallengesController {

    constructor() {}

    @RequestMapping({ path: '', method: RequestMethod.GET })
    async fn(req, res) { 
        res.send('challenges root endpoint');
    }

}