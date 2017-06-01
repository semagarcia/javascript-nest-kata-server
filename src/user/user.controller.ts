import { RequestMethod, Controller, RequestMapping } from 'nest.js';
import { UserService } from './user.service';
import { User, UserModel } from './../schemas/user';

const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('./../config.json');

@Controller({ path: 'api' })
export class UserController {

    constructor(private userSrv: UserService) {}

    @RequestMapping({ path: 'user', method: RequestMethod.GET })
    async fn(req, res) { 
        console.log('Headers: ', req.headers.authorization);
        console.log('Info for ', req.params.user);
        let token = req.headers.authorization.split(' ')[1];
        console.log('Token', token);
        let jwtInfo = jwt.verify(token, config.secretJwt);
        console.log('JWT: ', jwtInfo);
        let user = await this.userSrv.getUserInfoById(jwtInfo.sub);
        res.send(user);
    }

}