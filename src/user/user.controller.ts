import { RequestMethod, Controller, RequestMapping } from 'nest.js';

@Controller({ path: 'user' })
export class UserController {

    constructor() {}

    @RequestMapping({ path: '', method: RequestMethod.GET })
    async fn(req, res) { 
        res.send('user root endpoint');
    }

}