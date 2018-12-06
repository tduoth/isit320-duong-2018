var express = require('express');
var router = express.Router();
const Client = require('ssh2').Client;

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'System Check Refactor', author: 'By Thanh Duong' });
});

router.get('/associate-elastic-ip', function(request, response) {
    var message = {
        result: 'success',
        //foo: 'endpoint-called: ' + (request.query.foo),
        status: 'endpoint-called: /associate-elastic-ip',
        instanceId: request.query.instanceId,
        allocationId: request.query.allocationId,
        region: request.query.region
    };
    console.log(
        'associate-elastic-ip called:\n' + JSON.stringify(message, null, 4)
    );
    response.send(message);
});

router.get('/create-educate', function(request, response) {
    const awsInstanceParams = getAwsInstanceParams.awsEducate();
    createInstance(awsInstanceParams);
    response.send({
        result: 'success',
        status: 'endpoint-called: /create-educate'
    });
});

router.get('/create-standard', function(request, response) {
    var message = {
        result: 'success',
        status: 'endpoint-called: /create-standard'
    };
    console.log('create-standard called:\n' + JSON.stringify(message, null, 4));
    response.send(message);
});

router.get('/get-instance-status', function(request, response) {
    var message = {
        result: 'success',
        status: 'endpoint-called: /get-instance-status',
        instanceId: request.query.instanceId
    };
    console.log(
        'get-instance-status called:\n' + JSON.stringify(message, null, 4)
    );
    response.send(message);
});

router.get('/reboot-instance', function(request, response) {
    var message = {
        result: 'success',
        status: 'endpoint-called: /reboot-instance'
    };
    console.log('reboot-instance called:\n' + JSON.stringify(message, null, 4));
    response.send(message);
});

/* Set up a route called foo. */
router.get('/foo', function(request, response) {
    var message = { result: 'success', status: 'endpoint-called: /foo' };
    console.log('Foo called:\n' + JSON.stringify(message, null, 4));
    response.send(message);
});


module.exports = router;
