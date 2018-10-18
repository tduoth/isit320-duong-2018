import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';

class App extends Component {
    constructor() {
        super();
        this.state = {
            file: 'File name will be placed here.',
            status: 'waiting for server'
        };
    }

    queryServer = () => {
        const that = this;
        fetch('/api/foo')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                that.setState(foo => (json));
            })
            .catch(function(ex) {
                console.log('parsing failed, URL bad, network down, or similar', ex);
            });
            
    };
    
    createEducate = () => {
      const that = this;
        fetch('/api/create-educate')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                that.setState(foo => (json));
            })
            .catch(function(ex) {
                console.log('parsing failed, URL bad, network down, or similar', ex);
            });
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to Thanh React</h2>
                </div>

                <p className="App-intro">
                    State: {this.state.status} File: {this.state.file}
                </p>
                
                <button onClick={this.queryServer}>Bar</button> 
                
                <p>
                <button onClick={this.createEducate}>Create with AWS Educate Account</button>
                <button onClick={this.createWithAwsStandardAccount}>Create with AWS Standard Account</button>
                <button onClick={this.associateElasticIp}>Associate Elastic Ip</button>
                </p>
                <p>
                <button onClick={this.copyGetStarted}>Copy the GetStarted Script</button>
                <button onClick={this.runGetStarted}>Run the GetStarted Script</button>
                <button onClick={this.removeKnownHost}>Remove from KnownHost</button>
                </p>
            </div>
        );
    }
}

export default App;

