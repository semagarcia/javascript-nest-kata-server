import { RequestMethod, Controller, RequestMapping } from 'nest.js';
import { IndividualKataService } from './individual.component';
import { StreamingGateway } from './../core';

import { KataModel, Kata } from './../schemas/Kata';
import { TrainingPathModel } from './../schemas/TrainingPath';

@Controller({ path: 'api/individual' })
export class IndividualKataController {

    constructor(private individualKataSrv:IndividualKataService) {}

    @RequestMapping()
    async test1(req, res) {
        res.send({ status:'ok' });
    }

    @RequestMapping({ path: 'random', method: RequestMethod.GET })
    async getRandomKata(req, res) {
        let randomKata = await this.individualKataSrv.getRandomIndividualKata();
        res.send({ status:'ok', kata: randomKata });
    }

    @RequestMapping({ path: 'kata', method: RequestMethod.POST })
    async executeKata(req, res) {
        console.log('Executing kata: ' + req.body.kata);
        let resultKataTests = await this.individualKataSrv.executeKata(req.body.kata, req.body.function);
        res.status(200).json({ result: resultKataTests });
    }

}