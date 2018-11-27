import React, { Component } from 'react';
import './App.css';
import ElfHeader from './ElfHeader';

class App extends Component {
    constructor(props) {
        super(props);
        this.dataEndPoints = [
        '/script-pusher/run-script?script=', 
        '/script-pusher/run-system-tool?script=',  
        '/script-pusher/get-host-name?script=',
        '/script-pusher/run-uptime-tool?script=',
        '/ssh-runner/run-script?script=',
        '/ssh-runner/run-system-tool?script='
        ];
        
        this.state = {
            allData:'',
            selectedValue: '',
            endPointIndex: 0,
            
        };
    }

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
            } else { info = json.allData;}
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
    this.setState({...this.state, selectedValue: selectedValue, endPointIndex: endPointIndex});

};

handleSubmit = (event) => {
    this.setState({allData: ''});
    console.log('A name was submitted: ', this.state);
            //uptime console
     if(this.state.selectedValue === 'uptime'){
            console.log('Going to console');
            event.preventDefault();
        } 
        //uptime for remote server
   if(this.state.selectedValue === 'uptime1'){
          console.log('Going to ssh');
          this.Uptime();
           event.preventDefault();
       } 
        else{ this.runScript(this.dataEndPoints[this.state.endPointIndex], this.state.selectedValue);
        event.preventDefault();
        }
};

handleSubmitRemote = (event) => {
        this.setState({allData: ''});
        console.log('A name was submitted: ', this.state);
        this.Uptime();
        event.preventDefault();
};

    render() {
 return (                                                  
        <div className="App">                                 
            <ElfHeader />                                     
            <main>                                            
                <section>                                     
                    <RadioLocal />                              
                    <RadioRemote/>                            
                </section>                                    
                <button onClick={this.runFoo}>Run Foo</button>
                <p>Foo: {this.state.foo}</p>                  
            </main>                                           
        </div>                                                
    );                                                        
}        
}
export default App;