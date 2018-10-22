import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

	copyScript = () => {
	fetch('/script-pusher/copy-script')
	 .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                that.setState(foo => (json));
            })
            .catch(function(ex) {
                console.log('parsing failed, URL bad, network down, or similar', ex);
            })
};

  
          <div className="App">
    <header>
        <h1>Copy File</h1>
    </header>
    <main>
 <button onClick={this.copyScript}>Copy</button>
    </main>
</div>

        </header>
      </div>

    );

  }
}

export default App;
