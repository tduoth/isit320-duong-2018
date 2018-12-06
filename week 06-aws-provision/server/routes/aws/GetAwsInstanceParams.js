var AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});

const awsParams = {};

const getInstanceParams = (awsParams) => {
    return {
        BlockDeviceMappings: [
            {
                DeviceName: "/dev/sda1",
                Ebs: {
                    VolumeSize: 16,
                    VolumeType: 'gp2'
                }
            }
        ],
        ImageId: awsParams.ImageId,
        InstanceType: 't2.micro',
        KeyName: awsParams.KeyName,
        SecurityGroupIds: awsParams.SecurityGroupIds,
        MinCount: 1,
        MaxCount: 1
    };
};

function showAwsEducateCredentials() {
    AWS.config.credentials.get(function () {
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        console.log("Access Key:", AWS.config.credentials.accessKeyId);
        console.log("Secret Access Key:", AWS.config.credentials.secretAccessKey);
    });
}

function showAwsCharlieConfiguration() {
    AWS.config.loadFromPath(process.env.HOME + '/.aws/config.json');
    console.log(AWS.config);
}

module.exports.awsEducate = () => {
    showAwsEducateCredentials();
    AWS.config.update({region:'us-west-2'});
    awsParams.ImageId ='ami-0bbe6b35405ecebdb';
    awsParams.KeyName ='ec2week4';
    awsParams.SecurityGroupIds = ['sg-021824aab5cf15250'];
    return getInstanceParams(awsParams);
};

module.exports.awsCharlie = () => {
    showAwsCharlieConfiguration();
    awsParams.ImageId ='ami-0bbe6b35405ecebdb';
    awsParams.KeyName ='ec2week4';
    awsParams.SecurityGroupIds = ['sg-021824aab5cf15250'];
    return getInstanceParams(awsParams);
};






