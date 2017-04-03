import { Component, HttpException } from 'nest.js';
const fs = require('fs');

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
            // Read and update the exercise file
            let someFile = './katas/addTwoNumbers/ej.js';
            fs.readFile(someFile, 'utf8', function (err, data) {
                if (err) reject(err);
                
                // Save the last line to preserve it and rewrite it to the file
                let lastLine = data.substring(data.indexOf('module.exports ='));
                fs.writeFile(someFile, `${kataFunction}\n${lastLine}`, 'utf8', function (err) {
                    if (err) reject(err);

                    // Execute test
                    let spawn = require('child_process').spawn;
                    let npmTest = spawn('npm', ['test', '--prefix', './katas/addTwoNumbers']);
                    let output = [];

                    // Each line printed by NPM is received and pushed to the array
                    npmTest.stdout.on('data', function (data) {
                        output.push(data);
                    });

                    // Before to exit, rebuild the output in one single string
                    npmTest.on('close', function (code) {
                        // Avoid the two first lines (related to NPM):
                        // Line[0]: addTwoNumbers@1.0.0 test /path/to/katas/exercise
                        // Line[1]: ./node_modules/mocha/bin/mocha ej.test.js
                        resolve({
                            executionResult: code,
                            output: output.slice(2).join('')
                        });
                    });
                });
            });
        });
    }

}