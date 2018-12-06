/* eslint-disable no-unused-vars */
var express = require('express');
var router = express.Router();
const Client = require('ssh2').Client;
const elfUtils = require('elven-code').elfUtils;

const hostAddress = '52.32.223.69';

let allData = '';

const check = (request, response, next) => {
    console.log('REQUEST CHECK CALLED', request.query);
    const validOptions = ['UbuntuSetup', 'GetStarted'];
    if (request.query.script) {
        console.log('INSIDE REQUEST SCRIPT');
        if (!validOptions.includes(request.query.script)) {
            console.log('INSIDE REQUEST INVALID OPTION');
            response.send({
                result: 'error',
                error: 'Invalid Option: ' + request.query.script,
                script: request.query.script
            });
            return;
        }
    }
    next();
};

router.use(check);

//final
const getSshIp = () => {
    return new Promise(function(resolve, reject) {
        elfUtils
            .readFile(process.env.HOME + '/.ssh/config')
            .then(content => {
                var pattern = new RegExp(
                    'Host ec2-bc\n\t(.*)\n\t(.*)\n\t(.*)\n\t(.*)'
                );
                const result = {};
                const match = content.result.match(pattern);
                for (let i = 1; i < 5; i++) {
                    if (match[i].startsWith('HostName')) {
                        var hostPattern = new RegExp('HostName\\s(.*)');
                        result.hostName = match[i].match(hostPattern)[1];
                    }
                    if (match[i].startsWith('IdentityFile')) {
                        const idPattern = new RegExp('IdentityFile\\s(.*)');
                        const path = match[i].match(idPattern)[1];
                        result.identityFile = path.substring(
                            path.lastIndexOf('/') + 1,
                            path.length
                        );
                    }
                }
                console.log('IP result: ', result);
                resolve(result);
            })
            .catch(reject);
    });
};



//final
const runUbuntuSetup = (hostAddress, response) => {
    allData = '';
    var conn = new Client();
    conn.on('ready', function() {
        console.log('Client :: ready');
        conn.exec('~/UbuntuSetup', function(err, stream) {
            if (err) throw err;
            stream
                .on('close', function(code, signal) {
                    console.log(
                        'Stream :: close :: code: ' +
                            code +
                            ', signal: ' +
                            signal
                    );
                    conn.end();
                    response.send({ result: 'success', allData: allData });
                })
                .on('data', function(data) {
                    console.log('STDOUT: ' + data);
                    allData += data;
                })
                .stderr.on('data', function(data) {
                    console.log('STDERR: ' + data);
                    allData += data;
                });
        });
    }).connect({
        host: hostAddress,
        port: 22,
        username: 'ubuntu',
        privateKey: require('fs').readFileSync(
            process.env.HOME + '/.ssh/ec2key'
            //process.env.HOME + '/.ssh/' + identityFile
        )
    });
};

//final
const runGetStarted = (hostAddress, response) => {
    allData = '';
    var conn = new Client();
    conn.on('ready', function() {
        console.log('Client :: ready');
        conn.exec('~/GetStarted', function(err, stream) {
            if (err) throw err;
            stream
                .on('close', function(code, signal) {
                    console.log(
                        'Stream :: close :: code: ' +
                            code +
                            ', signal: ' +
                            signal
                    );
                    conn.end();
                    response.send({ result: 'success', allData: allData });
                })
                .on('data', function(data) {
                    console.log('STDOUT: ' + data);
                    allData += data;
                })
                .stderr.on('data', function(data) {
                    console.log('STDERR: ' + data);
                    allData += data;
                });
        });
    }).connect({
        host: hostAddress,
        port: 22,
        username: 'ubuntu',
        privateKey: require('fs').readFileSync(
            process.env.HOME + '/.ssh/ec2key'
            //process.env.HOME + '/.ssh/' + identityFile
        )
    });
};

router.get('/run-get-started', (request, response) => {
    console.log('run-get-started called in ssh-runner', hostAddress);
    getSshIp()
        .then(result => {
            response.send({
                result: 'success',
                route: 'run-get-started',
                host: result.hostName,
                'identity-file': result.identityFile
            });
        })
        .catch(err => {
            response.send(err);
        });
});

router.get('/run-ubuntu-setup', (request, response) => {
    console.log('run-ubuntu-setup called in ssh-runner', hostAddress);
    getSshIp()
        .then(result => {
            response.send({
                result: 'success',
                route: 'run-get-started',
                host: result.hostName,
                'identity-file': result.identityFile
            });
        })
        .catch(err => {
            response.send(err);
        });
});

module.exports = router;