import React, { Component } from 'react';
import './App.css';


class RadioLocal extends Component {

 render() {
        const radioLocal = (
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
                        value="VersionCheck" 
                        id="elf-radio-version" 
                        onChange={this.handleChange}/>
                        <label htmlFor="elf-radio-version"> Version Info </label>
                        
                        
                            <input 
                        type="radio" 
                        name="app-choice" 
                        data-endpoint="2"
                        value="hostname" 
                        id="elf-radio-hotname" 
                        onChange={this.handleChange}/>
                        
                        <label htmlFor="elf-radio-hostname">Host Name</label>
                        
                        <input 
                        type="radio" 
                        name="app-choice" 
                        data-endpoint="2"
                        value="uptime" 
                        id="elf-radio-uptime" 
                        onChange={this.handleChange}/>
                        
                        <label htmlFor="elf-radio-uptime">Uptime</label>
                    </div>
                    
                    
                   <div className="form-group">
                       <button type="submit" className="btn btn-primary">Run System Script </button>
                   </div>
                   </fieldset>
              
                 </form>
            </div>
            );
            
    
        }
    }

export default RadioLocal;
