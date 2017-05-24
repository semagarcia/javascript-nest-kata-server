import { RequestMethod, Controller, RequestMapping } from 'nest.js';

@Controller({ path: 'api/events' })
export class EventsController {

    constructor() {}

    @RequestMapping({ path: '', method: RequestMethod.GET })
    async getCurrentEvents(req, res) { 
        let mockData = ['JSDayEs2017', 'AngularCamp BCN 2017', 'Angular Connect 2017'];
        res.send(mockData);
    }

}