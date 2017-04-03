import { RequestMethod, Controller, RequestMapping } from 'nest.js';
import { LoginService } from './login.component';
import { StreamingGateway } from './../core';

@Controller({ path: '' })
export class LoginController {

    constructor(private loginSrv:LoginService, private streamingSrv:StreamingGateway) {}

    @RequestMapping()
    async test1(req, res) {
        console.log('Request to /' );
        //this.streamingSrv.sendMessage('msg', 'User trying to login...');
        res.send({ status:'ok' });
    }

    @RequestMapping({ path: 'login', method: RequestMethod.POST })
    async test2(req, res) {
        console.log(`Request received: trying to login with ${req.body.user}/${req.body.pass}`);
        const login = await this.loginSrv.standardLogin(req.body.user, req.body.pass);
        res.status(200).json(login);
    }

    @RequestMapping({ path: 'test', method: RequestMethod.GET })
    async test(req, res) {
        console.log('Launching tests...');
        let test = await this.loginSrv.executeTest(null);
        console.log('Test result: ', test);
        res.status(200).json({ result:test });
    }

    @RequestMapping({ path: 'test/:id', method: RequestMethod.GET })
    async test3(req, res) {
        console.log('Request to /test/:id con id=' + req.params.id);
        req.status(400).send({ error:110093, msg:'Error 110093 - Lorem ipsum...' });
    }


    @RequestMapping({ path: 'kata', method: RequestMethod.POST })
    async executeKata(req, res) {
        console.log('Execute test with: ' + req.body.function);
        let test = await this.loginSrv.executeTest(req.body.function);
        console.log('Test result: ', test);
        res.status(200).json({ result:test });
    }

}