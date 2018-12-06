var express = require('express');
var router = express.Router();
const Client = require('ssh2').Client;
const elfUtils = require('elven-code').elfUtils;


const getSshIp = () => {
    return new Promise(function (resolve, reject) {
        elfUtils.readFile(process.env.HOME + '/.ssh/config')
            .then((content) => {
                //var pattern = new RegExp('Host ec2-bc[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)');
                var pattern = new RegExp('Host ec2-bc\n\t(.*)\n\t(.*)\n\t(.*)\n\t(.*)');
                const result = {};
                const match = content.result.match(pattern);
                console.log(match);
                for (let i = 1; i < 5; i++) {
                    if (match[i].startsWith('HostName')) {
                        var hostPattern = new RegExp('HostName\\s(.*)');
                        result.hostName = match[i].match(hostPattern)[1];
                    }
                    if (match[i].startsWith('IdentityFile')) {
                        const idPattern = new RegExp('IdentityFile\\s(.*)');
                        const path = match[i].match(idPattern)[1];
                        result.identityFile = path.substring(path.lastIndexOf('/') + 1, path.length)
                    }
                }
                console.log('GET SSH IP', result);
                resolve(result);
            })
            .catch(reject);
    });
};
const runUptime = (hostAddress, identityFile, response) => {
    let allData = '';
    var conn = new Client();
    conn.on('ready', function(){
        console.log("Client ready");
        conn.exec( cmd, '/usr/bin/uptime', opts, function(err, stream){
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
                        response.send({result: 'success', allData: allData});
                    })
                .on('data', function(data){
                    console.log('STDOUT: ' + data);
                    allData += data;
                    })
                .stderr.on('data', function(data){
                    console.log('STDERR: ' + data);
                    allData += data;
                });

        })
    }).connect({
    host: hostAddress,
    port:22,
    username:'ubuntu',
    privateKey: require('fs').readFileSync(
        process.env.HOME + '/.ssh/' + identityFile
    )
});
}

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'System Check Refactor', author: 'By Thanh Duong' });
});

router.get('/create-educate', function(request, response) {
    var message = { result: 'success', endpoint: 'create-educate', status: 'active' };
    response.send(message);
});

router.get('/create-standard', function(request, response) {
    var message = { result: 'success', endpoint: 'create-standard', status: 'active' };
    response.send(message);
});

router.get('/associate-elastic-ip', function(request, response) {
    var message = { result: 'success', endpoint: 'associate-Elastic-Ip', status: 'active', Elasticip: '52.32.223.69' };
    response.send(message);
});

router.get('/reboot-instance', function(request, response) {
    var message = { result: 'success', endpoint: 'reboot-instance', status: 'active' };
    response.send(message);
});

router.get('/run-get-started', function(request, response) {
    var message = { result: 'success', endpoint: 'copy-get-started', status: 'active' };
    response.send(message);
});

router.get('/run-ubuntu-setup', function(request, response) {
    var message = { result: 'success', endpoint: 'run-ubuntu-setup', status: 'active' };
    response.send(message);
});

router.get('/copy-get-started', function(request, response) {
    var message = { result: 'success', endpoint: 'copy-get-started', status: 'active' };
    response.send(message);
});


module.exports = router;
