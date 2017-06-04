import { RequestMethod, Controller, RequestMapping } from 'nest.js';
import { KatasService } from './katas.service';

@Controller({ path: 'api/katas' })
export class KatasController {

    constructor(private katasSrv: KatasService) {}

    /**
     * Endpoint to receive all the katas
     * Path: /api/katas
     */
    @RequestMapping({ path: '', method: RequestMethod.GET })
    async getAllKatas(req, res) { 
        let katas = await this.katasSrv.getAllKatas();
        res.send({ katas: katas });
    }

    /**
     * Endpoint to retrieve a kata
     * Path: /api/katas/kata
     */
    @RequestMapping({ path: 'kata/:kataId', method: RequestMethod.GET })
    async getKataById(req, res) { 
        await this.katasSrv.getKataById(req.params.kataId)
            .then(kata => res.send(kata))
            .catch((err) => res.status(400).send(err));
    }

    /**
     * Endpoint to test katas
     * Path: /api/katas/execute
     */
    @RequestMapping({ path: 'execute', method: RequestMethod.POST })
    async executeKata(req, res) {
        let kataResult = await this.katasSrv.executeTest(req.body.function, req.body.name);
        res.status(200).json({ result: kataResult });
    }

    /**
     * Endpoint to receive the stats of all user/katas
     * Path: /api/katas/stats
     */
    @RequestMapping({ path: 'stats', method: RequestMethod.GET })
    async getAllKatasStatistics(req, res) { 
        let katasStats = await this.katasSrv.getAllKatasStatistics();
        res.send({ stats: katasStats });
    }

    /**
     * Endpoint to test katas
     * Path: /api/katas/stats/register
     */
    @RequestMapping({ path: 'stats/register', method: RequestMethod.POST })
    async registerKataStats(req, res) {
        let result = await this.katasSrv.updateKataStatistics(req.body.stats, req.session.username, req.session.email);
        res.status(200).json({ result: result });
    }

}