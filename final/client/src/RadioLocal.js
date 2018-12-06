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
   
    render() {
        return (
            <div className="App">

                <button onClick={this.createWithAwsStandardAccount}>Create with AWS Standard Account</button>
                <button onClick={this.createEducate}>Create with AWS Educate Account</button>
                <button onClick={this.associateElasticIp}>Associate Elastic Ip</button>

                <br />
                <p>state: {this.state.result}, file: {this.state.file}</p>
                <br />

           
            </div>
        );
    }
}

export default RadioLocal;