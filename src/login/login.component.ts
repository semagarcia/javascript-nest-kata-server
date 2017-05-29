import { Component, HttpException } from 'nest.js';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const config = require('./../config.json');

import { User, UserModel } from './../schemas/User';

@Component()
export class LoginService {

    async standardLogin(username: string, password: string) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ username: username }, (err, user: any) => {
                if(err || !user) reject(`Error at login: ${err}`);

                //if(user && bcrypt.compareSync(password, user.hash)) {
                if(user) {
                    resolve({ 
                        name: user.name,
                        // more fields, like next action / operation
                        token: jwt.sign({ 
                            sub: user._id,  // Identifies token
                            iat: moment().unix(),  // Token creation data,
                            exp: moment().add(60, 'minutes').unix(),  // Expires in 60 minutes
                            // more fields encoded into the token
                            name: user.name,
                            email: user.email
                        }, config.secretJwt)
                    });
                }
            });
        });
    }

}