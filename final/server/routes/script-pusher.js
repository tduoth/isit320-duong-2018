
/* eslint-disable semi */
var express = require('express');
var router = express.Router();

const spawn = require('child_process').spawn;

const check = (request, response, next) => {
    console.log('REQUEST CHECK CALLED', request.query);
    const validOptions = ['GetStarted', 'VersionCheck', 'uptime'];
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

const runSystemTool = sysTool => {
    return new Promise(function(resolve, reject) {
        let allData = '';
        console.log('Run System Tool ', sysTool);

        const pushScript = spawn(sysTool);

        pushScript.stdout.on('data', data => {
            console.log(`child stdout:\n${data}`);
            allData += ' ' + data;
            //console.log('PUSH', data);
        });

        pushScript.stderr.on('data', data => {
            console.log(`child stderr:\n${data}`);
            allData += ' ' + data;
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
/*
const scriptRunner = script => {
    return new Promise(function(resolve, reject) {
        let allData = '';
        console.log('Run Script', process.env.SETUP_LINUXBOX + '/' + script);
        const pushScript = spawn(process.env.SETUP_LINUXBOX + '/' + script);
        pushScript.stdout.on('data', data => {
            console.log(`child stdout:\n${data}`);
            allData += ' ' + data;
            //console.log('PUSH', data);
        });
        pushScript.stderr.on('data', data => {
            console.log(`child stderr:\n${data}`);
            allData += ' ' + data;
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
const copyFile = () => {
    return new Promise(function(resolve, reject) {
        console.log('Copy to EC2', process.env.SETUP_LINUXBOX);
        let allData = '';
        const pushScript = spawn('scp', [
            process.env.SETUP_LINUXBOX + '/CpuInfo',
            'ec2-bc:/home/ubuntu'
        ]);
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
*/

const copyGetStarted = () => {
    return new Promise(function(resolve, reject) {
        console.log('Copy GetStarted to EC2', process.env.SETUP_LINUXBOX);
        let allData = '';
        const pushScript = spawn('scp', [
            process.env.SETUP_LINUXBOX + '/GetStarted',
            'ec2-bc:/home/ubuntu'
        ]);

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

router.get('/copy-get-started', function(request, response) {
    'use strict';
    copyGetStarted()
        .then(result => {
            console.log(JSON.stringify(result, null, 4));
            //response.send(result); /////////////////////////////////
            response.send({
                result: 'success',
                status: 'endpoint-called: script-pusher/copy-get-started'
            });
        })
        .catch(err => {
            console.log(err);
            response.send(err);
        });
});
/*
router.get('/remove-known-host', function(request, response) {
    //runSystemTool
    'use strict';
    response.send({
        result: 'success',
        status: 'endpoint-called: script-pusher/remove-known-host'
    });
});
*/

router.get('/remove-known-host', function(request, response) {
    'use strict';
    //runSystemTool(request.query.script) //ssh-keygen -R hostname/18.212.127.29
    runSystemTool('ssh-keygen -R 18.212.127.29')
        .then(result => {
            //console.log(JSON.stringify(result, null, 4));
            response.send(result);
            /*
            response.send({
                result: 'success',
                status: 'endpoint-called: script-pusher/remove-known-host'
            });
            */
        })
        .catch(err => {
            console.log(err);
            response.send(err);
        });
});

/*
router.get('/run-script', function(request, response) {
    'use strict';
    console.log('QUERY', request.query);
    //responce.send({result: response.query});
    scriptRunner(request.query.script)
        .then(result => {
            //console.log(JSON.stringify(result, null, 4));
            response.send(result);
        })
        .catch(err => {
            console.log(err);
            response.send(err);
        });
});
*/
/*
router.get('/foo', (request, response) => {
    'use strict';
    response.send({
        file: 'script-pusher.js',
        result: 'foo = success',
        status: 'script-pusher works'
    });
});
*/

/*
router.get('/run-get-started', function(request, response) {
    'use strict';
    response.send({
        result: 'success',
        status: 'endpoint-called: script-pusher/run-get-started'
    });
});
*/

// below are old end points
/*
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
router.get('/copy-script', function(request, response) {
    'use strict';
    response.send({ result: 'success' });
});
*/

module.exports = router;