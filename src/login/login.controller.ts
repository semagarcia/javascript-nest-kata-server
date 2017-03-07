import { RequestMethod, Controller, RequestMapping } from 'nest.js';

@Controller({ path: '' })
export class LoginController {

    @RequestMapping()
    async test1(req, res) {
        console.log('Request to /' );
        res.send({status:'ok'});
    }

    @RequestMapping({ path: 'test/:id' })
    async test2(req, res) {
        console.log('Request to /test/:id');
        req.status(200).send({echo:`idParam sent: ${req.params.id}`});
    }

    @RequestMapping({ path: 'login' })
    async test3(req, res) {}

}