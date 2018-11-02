import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: 'unknown'
        };
    }
    callCpuInfo = () => {
        const that = this;
        fetch('ssh-runner/call-cpu-info')
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log('parsed json', json.allData);
                that.setState({allData: json.allData});
            })
            .catch(function (ex) {
                console.log('parsing failed, URL bad, network down, or similar', ex);
            })
    };

  render() {




    return (
      <div className="App">
      <header>
          <p className="byline">Welcome To Thanh SSH Script</p>
        <h1>Run SSH</h1>
      </header>
        <main>
            <button onClick={this.callCpuInfo}>Call Cpu Info</button>
            <p>{this.state.allData}</p>
        </main>

          <footer>
              <p>&copy; 2018 </p>
          </footer>




      </div>
    );
  }
}

export default App;
