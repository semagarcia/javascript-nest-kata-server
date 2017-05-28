import { RequestMethod, Controller, RequestMapping } from 'nest.js';
import { KatasService } from './../katas/katas.service';

@Controller({ path: 'api/ranking' })
export class RankingController {

    constructor(private katasSrv: KatasService) {}

    @RequestMapping({ path: '', method: RequestMethod.GET })
    async getRanking(req, res) { 
        let katasStats = await this.katasSrv.getAllKatasStatistics();
        res.send({ ranking: katasStats });
    }

}