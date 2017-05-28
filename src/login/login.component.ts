import { Component, HttpException } from 'nest.js';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

                        token: jwt.sign({ sub: user._id }, config.secretLogin)
                    });
                }
            });
        });
    }

}