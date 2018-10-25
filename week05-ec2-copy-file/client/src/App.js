import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

constructor(props) {
super(props);
this.state = 
{ allData: "unknown"};
}

copyFile = () => {
    fetch('/script-pusher/copy-file')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log('parsed json', json.allData);
	that.setState({allData: json.allData});   
        })
        .catch(function(ex) {
            console.log('parsing failed', ex);
        });
};
	
  render() {
    return (


     <div className="App">
    <header>
        <h1>Copy File</h1>
    </header>
    <main>

           <button onClick={this.copyFile}>Copy</button>
    </main>
</div>

    );
  }
}



export default App;
