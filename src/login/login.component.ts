import { Component, HttpException } from 'nest.js';

@Component()
export class LoginService {

    standardLogin(user:string, pass:string) {
        if(user === 'admin' && pass === 'pass') {
            return Promise.resolve({ user:'admin', role:'admin' });
        } else {
            throw new HttpException("User not found", 404);
        }
    }

}