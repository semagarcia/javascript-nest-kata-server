import { Component, HttpException } from 'nest.js';
const jwt = require('jsonwebtoken');
const config = require('./../config.json');

import { User, UserModel } from './../schemas/User';

@Component()
export class UserService {

    async getUserInfoById(userId: string) {
        return new Promise((resolve, reject) => {
            UserModel.findById({ _id: userId }, { password: 0 }, (err, user: User) => {
                if(err) reject(err);
                resolve(user);
            });
        });
    }

}