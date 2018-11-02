import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {

const radioWeb =  (
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
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <main>
    <section>
{radioWeb}
    </section>
    <section>
        <pre>{this.state.allData}</pre>
    </section>
    <button onClick={this.runFoo}>Run Foo</button>
</main>

          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
