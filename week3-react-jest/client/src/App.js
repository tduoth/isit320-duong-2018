import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {

constructor() {
    super();
    this.state = {
        file: 'unknown',
        status: 'waiting'
    };
}
bar = () => {
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
            console.log('parsing failed', ex);
        });
};
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>

          </p>
	<p className="App-intro">
                state: {this.state.status}
            </p>
            <p className="App-intro">
                file: {this.state.file}
            </p>
            <button onClick={this.bar}>Bar</button>
        </header>

      </div>
    );
  }
}

export default App;
