import { RequestMethod, Controller, RequestMapping } from 'nest.js';

@Controller({ path: 'admin' })
export class AdminController {

    constructor() {}

    @RequestMapping({ path: '', method: RequestMethod.GET })
    async fn(req, res) { 
        res.send('admin root endpoint');
    }

}