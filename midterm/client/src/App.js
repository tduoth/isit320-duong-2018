import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
render()
{

      const radioWeb = (
          <div className="container">
          <form onSubmit={this.handleSubmit}>
  <fieldset>
      <div className="elf-form-field">

          <legend>Services</legend>
          <input
      type="radio"
      name="app-choice"
      data-endpoint="0"
      value="CpuInfo"
      id="elf-radio-cpu"
      onChange={this.handleChange}
      />
      <label htmlFor="elf-radio-cpu">CpuInfo</label>

          <input
      type="radio"
      name="app-choice"
      data-endpoint="0"
      value="VersionCheck"
      id="elf-radio-version"
      onChange={this.handleChange}
      />
      <label htmlFor="elf-radio-version">Version Info</label>

      </div>

      <div className="form-group">
          <button type="submit" className="btn btn-primary">Run System Script</button>
      </div>
      </fieldset>
      </form>
      </div>
  );

return 
(
 <div className="App">
<label for="elf-radio-uptime">Uptime</label>
 </div>
)
	}
}

export default App;
