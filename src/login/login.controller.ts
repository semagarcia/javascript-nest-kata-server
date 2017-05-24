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
        session.event = req.body.event;
        res.status(200).json({ user: session.username, email: session.email, event: session.event });
    }

    @RequestMapping({ path: 'session', method: RequestMethod.GET })
    getession(req, res) {
        res.send(req.session);
    }

    @RequestMapping({ path: 'logout', method: RequestMethod.GET })
    logout(req, res) {
        if(req.session.username) {
            let username = req.session.username;
            req.session.destroy((err) => {
                if(err) {
                    res.status(400).json({ result: false, err: err });
                }
                res.status(200).json({ user: username, result: true });
            });
        } else {
            res.status(200).json({ result: true })
        }
    }

}