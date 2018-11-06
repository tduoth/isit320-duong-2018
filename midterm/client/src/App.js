import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: 'CPU: unknown',
            currentVersion: 'Version: unknown'
        };
    }

    copyFile = () => {
        const that = this;
        fetch('/script-pusher/copy-file')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json.allData);
                that.setState({ allData: json.allData });
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };
    
    runFoo = () => {
        fetch('/foo')
        .then(function(response){
            return response.json();
        })
        .then(function (json) {
            console.log(JSON.stringify(json, null, 4));
        })
        .catch(function (ex) {
            console.log('parsing failed, URL bad, network json')
        });
    }

    versionChk = () => {
        const that = this;
        fetch('/script-pusher/version-check')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json.currentVersion);
                that.setState({ currentVersion: json.currentVersion });
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };

    handleChange = (event) => {
        const selectedValue = event.target.value;
        console.log('HANDLE CHANGE', selectedValue);
        this.setState({
            ...this.state,
            selectedValue: selectedValue
        });

    };

    handleSubmit= (event) => {
        this.setState({allData: ''});
        console.log('A name was submitted: ' , this.state);
        //if (this.state.selectedValue === 'cpu') {
        this.runCpuInfo(this.state.selectedValue);
        //}
        event.preventDefault();
    };


    render() {
        const radioWeb = (
            <div className="container">
                <form onSubmit={this.handleSubmit} >

                    <div className="elf-form-field" >
                        <input type="radio" name="app-choice" value="CpuInfo" id="elf-radio-cpu" onChange={this.handleSubmit}/>
                        <label htmlFor="elf-radio-cpu">CpuInfo</label>

                        <input type="radio" name="app-choice" value="VersionCheck" id="elf-radio-version" onChange={this.handleChange}/>
                        <label htmlFor="elf-radio-version">Version Info</label>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Run System Script</button>
                    </div>
                </form>
            </div>
        );
        return (
            <div className="App">
                <header className="App-header">
                 <img src={logo} className="App-logo" alt="logo"/>
                    <p>CPU INFO</p>
                    <br />
                    <button onClick={this.versionChk}>Get CPU Info</button>
                    <pre>{this.state.allData}</pre>
                    <p>CURRENT LINUX INFO</p>
                    <br />
                    <button onClick={this.versionChk}>Check Version</button>
                    <pre>{this.state.currentVersion}</pre>

                </header>
                <main>
                    <section>
                        {radioWeb}
                    </section>
                    <section>
                        <pre>{this.state.allData}</pre>
                    </section>
                    <button onClick={this.runFoo}>Run Foo</button>
                </main>

            </div>
        );
    }
}

export default App;