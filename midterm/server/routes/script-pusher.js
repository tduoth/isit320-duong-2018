/* eslint-disable semi */
var express = require('express');
var router = express.Router();

const spawn = require('child_process').spawn;

let allData = '';
let currentVersion = '';

const copyFile = () => {
    return new Promise(function(resolve, reject) {
        console.log('Run CPU Info', process.env.SETUP_LINUXBOX);

        const pushScript = spawn(process.env.SETUP_LINUXBOX + '/CpuInfo');

        pushScript.stdout.on('data', data => {
            console.log(`child stdout:\n${data}`);
            allData += 'PUSH-SCRIPT: ' + data;
            //console.log('PUSH', data);
        });

        pushScript.stderr.on('data', data => {
            console.log(`child stderr:\n${data}`);
            allData += 'PUSH-SCRIPT: ' + data;
            //console.error('PUSH', data);
        });

        pushScript.on('close', code => {
            resolve({
                result: 'success',
                allData: allData,
                code: code
            });
        });

        pushScript.on('error', code => {
            reject({
                result: 'error',
                code: code
            });
        });
    });
};


const check = (request, response, next) => {
    console.log('REQUEST CHECK CALLED', request.query);
    const validOptions = ['CpuInfo', 'VersionCheck', 'uptime'];
    if (request.query.script) {
        console.log('INSIDE REQUEST SCRIPT');
        if (!validOptions.includes(request.query.script)) {
            console.log('INSIDE REQUEST INVALID OPTION');
            response.send({result: 'error', error: 'Invalid Option: ' + request.query.script, script: request.query.script});
            return;
        }
    }
    next();
};

router.use(check);

const scriptRunner = (script) => {
    return new Promise(function(resolve, reject){
        console.log('CpuInfo', process.env.SETUP_LINUXBOX);
        
        const pushScript = spawn(process.env.SETUP_LINUXBOX +'/' + script);
        
        pushScript.stdout.on('data', data => {
            //console.log('child stdout:\n${data}');
            allData += data;
            
        });
        
        pushScript.stderr.on('data', data => {
            allData += data;
        });
        
        pushScript.on('close', code => {
            resolve({
                result: 'success',
                allData: allData,
                code: code
                
            });
        });
    });
};

const VersionCheck = () => {
    return new Promise(function(resolve, reject) {
        console.log('Run Version check', process.env.SETUP_LINUXBOX);

        const pushScript = spawn(process.env.SETUP_LINUXBOX + '/VersionCheck');

        pushScript.stdout.on('data', data => {
            console.log(`child stdout:\n${data}`);
            currentVersion += ' ' + data;
            //console.log('PUSH', data);
        });

        pushScript.stderr.on('data', data => {
            console.log(`child stderr:\n${data}`);
            currentVersion += ' ' + data;
            //console.error('PUSH', data);
        });

        pushScript.on('close', code => {
            resolve({
                result: 'success',
                currentVersion: currentVersion,
                code: code
            });
        });

        pushScript.on('error', code => {
            reject({
                result: 'error',
                code: code
            });
        });
    });
};

router.get('/copy-file', function(request, response) {
    'use strict';
    copyFile()
        .then(result => {
            console.log(JSON.stringify(result, null, 4));
            response.send(result);
        })
        .catch(err => {
            console.log(err);
            response.send(err);
        });
});

router.get('/version-check', function(request, response) {
    'use strict';
    VersionCheck()
        .then(result => {
            console.log(JSON.stringify(result, null, 4));
            response.send(result);
        })
        .catch(err => {
            console.log(err);
            response.send(err);
        });
});

router.get('/copy-script', function(request, response) {
    'use strict';
    response.send({ result: 'success' });
});

router.get('/foo', function(request, response) {
    var message = { 'State': 'success', 'status': 'Bar', 'file': 'api.js' };
    console.log('Foo called:\n' + JSON.stringify(message, null, 4));
    response.send(message);
});

module.exports = router;