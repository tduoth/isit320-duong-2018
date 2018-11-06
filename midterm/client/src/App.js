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
                        <input type="radio" name="app-choice" value="CpuInfo" id="elf-radio-cpu" onChange={this.handleChange}/>
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
                    <p>Display CPU information</p>
                    <br />
                    <button onClick={this.copyFile}>Get CPU Info</button>
                    <pre>{this.state.allData}</pre>
                    <br />
                    <p>======================================</p>
                    <br />
                    <p>Check the current version of Linux</p>
                    <br />
                    <button onClick={this.versionChk}>Check Version</button>
                    <pre>{this.state.currentVersion}</pre>


                    <br />
                    <p>======================================</p>
                    <br />
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