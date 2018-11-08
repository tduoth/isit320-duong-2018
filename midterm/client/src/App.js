import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.dataEndPoints = ['/script-pusher/run-script?script=', '/script-pusher/run-system-tool?script='];
        this.state = {
            allData: 'CPU: unknown',
            currentVersion: 'Version: unknown',
            selectedValue: '',
            endPointIndex: 0,
            status: 'waiting for server'
            
        };
    }
    
 queryServer = () => {
        const that = this;
        fetch('/script-pusher/foo')
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
    
runScript = (path, script) => {
    const that = this;
    if (!script) {
        return;
    }
    fetch(path + script)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log('allData', json.allData);
            console.log('result', json.result);
            console.log('code', json.code);
            console.log('error', json.error);
            let info = '';
            if (json.result === 'error') {
                info = json.error;
            } else if (script === 'CpuInfo') {
                var regex1 = RegExp('model name.*', 'g');
                let array1 = regex1.exec(json.allData);
                while (array1 !== null) {
                    info += array1[0] + '\n';
                    console.log(`Found ${array1[0]}.`);
                    array1 = regex1.exec(json.allData);
                }
            } else {
                info = json.allData;
            }
            that.setState({allData: info});
        })
        .catch(function (ex) {
            console.log('parsing failed, URL bad, network down, or similar', ex);
        });
};


handleChange = (event) => {
    const selectedValue = event.target.value;
    const endPointIndex = event.target.getAttribute('data-endpoint');
    console.log('HANDLE CHANGE', selectedValue);
    this.setState({
        ...this.state,
        selectedValue: selectedValue,
        endPointIndex: endPointIndex
    });

};

handleSubmit = (event) => {
    this.setState({allData: ''});
    console.log('A name was submitted: ', this.state);
    this.runScript(this.dataEndPoints[this.state.endPointIndex], this.state.selectedValue);
    event.preventDefault();
};


    render() {
        const radioWeb = (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                <fieldset>
                
                    <div className="elf-form-field" >
                    <legend>Services</legend>
                    
                    
                        <input  
                        type="radio" 
                        name="app-choice" 
                        data-endpoint="0"
                        value="CpuInfo" 
                        id="elf-radio-cpu" 
                        onChange={this.handleChange}/>
                        
                        <label htmlFor="elf-radio-cpu">CpuInfo</label>
                        
                    

                        <input 
                        type="radio" 
                        name="app-choice" 
                        data-endpoint="0"
                        value="versionCheck" 
                        id="elf-radio-version" 
                        onChange={this.handleChange}/>
                        
                        <label htmlFor="elf-radio-version"> Version Info </label>
                        
                        <input 
                        type="radio" 
                        name="app-choice" 
                        data-endpoint="0"
                        value="uptime" 
                        id="elf-radio-version" 
                        onChange={this.handleChange}/>
                        
                        <label for="elf-radio-uptime">Uptime</label>
                        
                        
                    </div>

                   <div className="form-group">
                       <button type="submit" className="btn btn-primary">Run System Script </button>
                   </div>
                   </fieldset>
                </form>
            </div>
        );
        return (
            <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
                  
                

                </header>
         <main>
                    <section>{radioWeb}</section>
                    <section>
                        <pre>{this.state.allData}</pre>
                        <pre>{this.state.currentVersion}</pre>
                    </section>
                    <button onClick={this.queryServer}>Run Foo</button>
                    <pre>{this.state.status}</pre>
                    
</main>

            </div>
        );
    }
}

export default App;