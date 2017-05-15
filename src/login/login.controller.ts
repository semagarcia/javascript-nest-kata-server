import { RequestMethod, Controller, RequestMapping } from 'nest.js';
import { LoginService } from './login.component';
import { StreamingGateway } from './../core';

import { KataModel, Kata } from './../schemas/Kata';
import { TrainingPathModel } from './../schemas/TrainingPath';

@Controller({ path: 'api' })
export class LoginController {

    constructor(private loginSrv:LoginService, private streamingSrv:StreamingGateway) {}

    @RequestMapping({ path: 'login', method: RequestMethod.POST })
    login(req, res) {
        let session = req.session;
        session.username = req.body.user;
        session.email = req.body.email;
        res.status(200).json({ user: session.username, email: session.email });
    }

    @RequestMapping({ path: 'logout', method: RequestMethod.GET })
    logout(req, res) {
        let username = req.session.username,
            email = req.session.email;
        req.session.destroy((err) => {
            if(err) res.status(400).json({ err: err });
            res.status(200).json({ user: username, email: email });
        });
    }

}