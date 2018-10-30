import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';

class App extends Component {


constructor(props) {
super(props);
this.state = 
{ allData: "unknown",
  };
}

copyFile = () => {

       const that= this;
    fetch('/script-pusher/copy-file')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log('parsed json', json.allData);
	that.setState({allData:json.allData});   
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
    <p className="App-intro">
                    Result: {this.state.allData}
                </p>
    </header>
    <main>

           <button onClick={this.copyFile}>Copy</button>
    </main>
</div>

    );
  }
}



export default App;

