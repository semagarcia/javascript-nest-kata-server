import { Component, HttpException } from 'nest.js';

@Component()
export class LoginService {

    async standardLogin(user:string, pass:string) {
        if(user === 'admin' && pass === 'pass') {
            return Promise.resolve({ user:'admin', role:'admin' });
        } else {
            throw new HttpException("User not found", 404);
        }
    }

    async executeTest(kataFunction: string) {
        console.log('Entrando en executeTest()');
        return new Promise(async(resolve, reject) => {       
            // Read and update the man file
            var fs = require('fs');
            var someFile = './katas/ej0/ej.js';
            fs.readFile(someFile, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                
                var lastLine = data.substring(data.indexOf('module.exports ='));
                fs.writeFile(someFile, kataFunction + '\n' + lastLine, 'utf8', function (err) {
                    if (err) return console.log(err);

                    // Execute test
                    var spawn = require('child_process').spawn;
                    var npmTest = spawn('npm', ['test', '--prefix', './katas/ej0']);
                    var outputStr = '';

                    npmTest.stdout.on('data', function (data) {
                        console.log(data.toString());
                        outputStr += data;
                    });

                    npmTest.on('close', function (code) {
                        resolve(outputStr);
                    });
                });
            });
        });
    }

}