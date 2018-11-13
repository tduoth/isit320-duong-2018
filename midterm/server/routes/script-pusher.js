/* eslint-disable semi */
var express = require('express');
var router = express.Router();


const spawn = require('child_process').spawn;

let allData = '';
let currentVersion = '';


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
    console.log("This is from scriptRunner");
    return new Promise(function(resolve, reject) {
        console.log('Run CPU info', process.env.SETUP_LINUXBOX);

        const pushScript = spawn(process.env.SETUP_LINUXBOX + '/' + script);

        pushScript.stdout.on('data', data => {
            console.log(`child stdout:\n${data}`);
            allData += data;
            //console.log('PUSH', data);
        });

        pushScript.stderr.on('data', data => {
            console.log(`child stderr:\n${data}`);
            allData += data;
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



const runSystemTool = (script) => {
    console.log("This is from runSystemTool");
    return new Promise(function(resolve, reject) {

        const pushScript = spawn('/usr/bin/' + script);

        pushScript.stdout.on('data', data => {
            console.log(`child stdout:\n${data}`);
            allData += data;
            //console.log('PUSH', data);
        });

        pushScript.stderr.on('data', data => {
            console.log(`child stderr:\n${data}`);
            allData += data;
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


const runUptime = (script) => {
    console.log("This is from runUptime");
    return new Promise(function(resolve, reject) {

        const pushScript = spawn(script);

        pushScript.stdout.on('data', data => {
            console.log(`child stdout:\n${data}`);
            allData += data;
            //console.log('PUSH', data);
        });

        pushScript.stderr.on('data', data => {
            console.log(`child stderr:\n${data}`);
            allData += data;
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


router.get('/run-script', (request, response) => {
    'use strict';
    allData = "",
   // console.log('QUERY', request.query);
    scriptRunner(request.query.script)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        console.log(err);
        response.send(err);
    });
});

router.get('/run-system-tool', (request, response) =>{
    'use strict';
       allData= '';
  // console.log('QUERY IN RUN SYTEM TOOL', request.query);
    runSytemTool(request.query.script)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        console.log(err);
        response.send(err);
    });
});

router.get('/run-uptime-tool', (request, response) =>{
    'use strict';
       allData= '';
  // console.log('QUERY IN RUN SYTEM TOOL', request.query);
    runUptime(request.query.script)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        console.log(err);
        response.send(err);
    });
});

router.get('/foo', function(request, response) {
    var message = { 'State': 'success', 'status': 'Bar', 'file': 'api.js' };
    console.log('Foo called:\n' + JSON.stringify(message, null, 4));
    response.send(message);
});

module.exports = router;