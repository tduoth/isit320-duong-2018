var express = require('express');
var router = express.Router(); 
const getAwsInstanceParams = require('./aws/GetAwsInstanceParams');
const createInstance = require('./aws/AwsPromise');
const associate = require('./aws/AssociateElasticIp');
const program = require('commander');


/* Set up a route called foo. */
router.get('/foo', function(request, response) {
    var message = { 'State': 'success', 'status': 'Bar', 'file': 'api.js' };
    console.log('Foo called:\n' + JSON.stringify(message, null, 4));
    response.send(message);
});

router.get('/create-educate', function(request, response){
    const getAwsInstanceParams = getAwsInstanceParams.awsEducate();
    createInstance(getAwsInstanceParams);
    response.send({result: 'sucess'});
   
});


module.exports = router;

