import React, { Component } from 'react';
import './App.css';


class RadioLocal extends Component {
    constructor() {
        super();
        this.dataEndPoints = [
            // add new end points for each endpoint that needs a prameter
            '/associate-elastic-ip?instanceId=xxx&allocationId=yyy&region=zzz',
            '/get-instance-status?instanceId=xxx',
            '/remove-known-host?ec2Ip=xxx.xxx.xxx.xxx'
        ];
        this.state = {
            file: 'File name will be placed here.',
            status: 'waiting for server'
        };
    }

    queryServer = () => {
        const that = this;
        fetch('/foo')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                //that.setState(foo => json);
                that.setState(json);
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };

    createEducate = () => {
        const that = this;
        fetch('/create-educate')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                //that.setState(foo => json);
                that.setState(json);
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };

    createWithAwsStandardAccount = () => {
        const that = this;
        fetch('/create-standard')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                //that.setState(foo => json);
                that.setState(json);
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };
    associateElasticIp = () => {
        const that = this;
        fetch('/associate-elastic-ip')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                //that.setState(foo => json);
                that.setState(json);
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };
    copyGetStarted = () => {
        const that = this;
        fetch('/script-pusher/copy-get-started')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                //that.setState(foo => json);
                that.setState(json);
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };
    runGetStarted = () => {
        const that = this;
        fetch('/script-pusher/run-get-started')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                //that.setState(foo => json);
                that.setState(json);
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };
    removeKnownHost = () => {
        const that = this;
        fetch('/script-pusher/remove-known-host?ec2ip=')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                //that.setState(foo => json);
                that.setState(json);
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };
    rebootInstance = () => {
        const that = this;
        fetch('/script-pusher/remove-known-host')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                //that.setState(foo => json);
                that.setState(json);
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };
    instanceStatus = () => {
        const that = this;
        fetch('/script-pusher/remove-known-host')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                //that.setState(foo => json);
                that.setState(json);
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };

    render() {
        return (
            <div className="App">
                <ElfHeader />

                <button onClick={this.createWithAwsStandardAccount}>Create with AWS Standard Account
                </button>
                <button onClick={this.createEducate}>
                    Create with AWS Educate Account
                </button>
                <button onClick={this.associateElasticIp}>
                    Associate Elastic Ip
                </button>

                <br />
                <p>
                    state: {this.state.status}, file: {this.state.file}
                </p>
                <br />

                <button onClick={this.copyGetStarted}>
                    Copy the GetStarted Script
                </button>

                <br />

                <button onClick={this.runGetStarted}>
                    Run the GetStarted Script on EC2
                </button>
                <button onClick={this.runGetStarted}>
                    Run the RunUbuntuSetup Script on EC2
                </button>

                <br />

                <button onClick={this.removeKnownHost}>
                    Remove from KnownHost
                </button>
                <button onClick={this.instanceStatus}>
                    Get Instance Status
                </button>
                <button onClick={this.rebootInstance}>Reboot Instance</button>

                <p>export PORT=30025</p>
                <p>export SERVER_PORT=30026</p>
                <p>export ELF_SCREF_PORT=30030</p>
                <p>export ELF_SYSTEM_CHECK_PORT=30034</p>
                <p>export MIDTERM_PORT=30035</p>

                <section>
                    <RadioLocal />
                    <RadioRemote />
                </section>
            </div>
        );
    }
}

export default RadioLocal;