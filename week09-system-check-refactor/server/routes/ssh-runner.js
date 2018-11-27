var express = require('express');
var router = express.Router();
const Client = require('ssh2').Client;
const elfUtils = require('elven-code').elfUtils;

const hostAddress = '52.32.223.69';

let allData = '';

const runUptime = (hostAddress, response) => {
    var conn = new Client();
    conn.on('ready', function () {
        console.log('Client :: ready');
        conn.exec('uptime', function (err, stream) {
            if (err) throw err;
            stream
                .on('close', function (code, signal) {
                    console.log(
                        'Stream :: close :: code: ' +
                        code +
                        ', signal: ' +
                        signal
                    );
                    conn.end();
                    response.send({result: 'success', allData: allData});
                })
                .on('data', function (data) {
                    console.log('STDOUT: ' + data);
                    allData += data;
                })
                .stderr.on('data', function (data) {
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
        )
    });
};

const check = (request, response, next) => {
    console.log('REQUEST CHECK CALLED', request.query);
    const validOptions = ['CpuInfo', 'VersionCheck', 'HostAdress', 'uptime'];
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


router.get('/run-uptime', function(request, response) {
    allData = '';
    runUptime(hostAddress, response);
});

module.exports = router;
