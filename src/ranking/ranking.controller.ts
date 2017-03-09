import { RequestMethod, Controller, RequestMapping } from 'nest.js';

@Controller({ path: 'ranking' })
export class RankingController {

    constructor() {}

    @RequestMapping({ path: '', method: RequestMethod.POST })
    async fn(req, res) { 
        res.send('ranking root endpoint');
    }

}