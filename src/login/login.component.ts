import { Component, HttpException } from 'nest.js';

@Component()
export class LoginService {

    async standardLogin(user:string, pass:string) {
        if(user === 'admin' && pass === 'pass') {
            return Promise.resolve({ result: true, user: 'admin', role: 'admin' });
        } else {
            throw new HttpException("User not found", 404);
        }
    }

}