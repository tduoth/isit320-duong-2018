var express = require('express');
var router = express.Router(); 
const getAwsInstanceParams = require('GetAwsInstanceParams');
const createInstance =require('AwsPromise');
const associate = require('associateElasticIp')


/* Set up a route called foo. */
router.get('/foo', function(request, response) {
    var message = { 'State': 'success', 'status': 'Bar', 'file': 'api.js' };
    console.log('Foo called:\n' + JSON.stringify(message, null, 4));
    response.send(message);
});

router.get('/create-educate', function(request, response){
    const awsInstanceParams = getAwsInstanceParams.awsEducate();
    createInstance(awsInstanceParams);
    response.send({result: 'sucess'});
   
});


module.exports = router;

