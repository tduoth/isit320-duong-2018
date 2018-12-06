var AWS = require('aws-sdk');
//AWS.config.loadFromPath(process.env.HOME + '/.aws/config.json');
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
var elasticIpParams = {
    AllocationId: 'eipalloc-0058cead2ce374c9b',
    InstanceId: 'i-0deaad592813c8253'
};

module.exports = () => {
    ec2.associateAddress(elasticIpParams, (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
};
