import { RequestMethod, Controller, RequestMapping } from 'nest.js';
import { LoginService } from './login.component';

@Controller({ path: '' })
export class LoginController {

    constructor(private loginSrv:LoginService) {}

    @RequestMapping()
    async test1(req, res) {
        console.log('Request to /' );
        res.send({status:'ok'});
    }

    @RequestMapping({ path: 'login', method: RequestMethod.POST })
    async test2(req, res) {
        console.log(`Request received: trying to login with ${req.body.user}/${req.body.pass}`);
        const login = await this.loginSrv.standardLogin(req.body.user, req.body.pass);
        res.status(200).json(login);
    }

    @RequestMapping({ path: 'test/:id', method: RequestMethod.GET })
    async test3(req, res) {
        console.log('Request to /test/:id con id=' + req.params.id);
        req.status(400).send({error:110093, msg:'Error 110093 - Lorem ipsum...'});
    }

}