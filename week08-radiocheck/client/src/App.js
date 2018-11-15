import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.dataEndPoints = [
        '/script-pusher/run-script?script=', 
        '/script-pusher/run-system-tool?script=',  
 ];
        
        this.state = {
            allData: 'CPU: unknown',
            uptime: 'Uptime: unknown',
            chechedRadioButton: 'none',
            message: 'none',
       
            
        };
    }

        Uptime = () => {
        const that = this;
        fetch('ssh-runner/run-uptime')
            .then(function (response) {return response.json();})
            .then(function (json) {
                console.log('JSON allData from server:', json.allData);
                that.setState({allData: json.allData});
            })
            .catch(function (ex) {
                console.log('parsing failed, error on server, URL bad, network down, or similar');
                console.log(JSON.stringify(ex, null, 4));
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
            } else if (script === 'uptime') {
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
    this.setState({
        ...this.state,
        selectedValue: selectedValue,
        endPointIndex: endPointIndex
    });

};

handleSubmit = (event) => {
    this.setState({allData: ''});
    console.log('A name was submitted: ', this.state);
            if(this.state.selectedValue === 'uptime'){
            console.log('Going to console');
            this.Uptime();
            event.preventDefault();
        }  
            if(this.state.selectedValue === 'uptime1'){
            console.log('Going to ssh');
            this.Uptime();
            event.preventDefault();
        } 
        else{ 
        this.runScript(this.dataEndPoints[this.state.endPointIndex], this.state.selectedValue);
        event.preventDefault();
        }
};

  handleSubmitRemote = (event) => {
        this.setState({allData: ''});
        console.log('A name was submitted: ', this.state);
        this.Uptime();
        event.preventDefault();
};

handleRadioChange = (event) => {
    this.setState({chechedRadioButton: event.target.value});
};

useRadioButtonSelection = () => {
    this.setSate({message: "You've choosen" + this.state.chechedRadioButton});
}; 

    render()  {
        
        var bookRadios = (
                    <div>
                        <input  
                        type="radio" 
                        name="book-radio"
                        value="radioOne" 
                        id="radio-one" 
                        checked={this.state.checkedRadioButton ==="RadioOne"}
                        onChange={this.handleRadioChange}
                        />
                    <label htmlFor="radio-one" className="book-radio">Book Radio 1</label>
              <input  
                        type="radio" 
                        name="book-radio"
                        value="radioTwo" 
                        id="radio-two" 
                        checked={this.state.checkedRadioButton ==="RadioTwo"}
                        onChange={this.handleRadioChange}
                        />
                  <label htmlFor="radio-two" className="book-radio">Book Radio 2</label>      
               <input  
                        type="radio" 
                        name="book-radio"
                        value="radioThree" 
                        id="radio-three" 
                        checked={this.state.checkedRadioButton ==="RadioThree"}
                        onChange={this.handleRadioChange}
                        /> 
                    <label htmlFor="radio-three" className="book-radio">Book Radio 3</label>
            </div>
            );
                
        
        return (
            <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
                  

                </header>
         <main>
                  
                    <section>
                        <pre>{this.state.allData}</pre>
                    </section>
                    
</main>

            </div>
        );
    }
}

export default App;