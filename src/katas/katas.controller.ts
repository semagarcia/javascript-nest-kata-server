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

}