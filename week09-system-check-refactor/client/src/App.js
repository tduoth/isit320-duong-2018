import React, { Component } from 'react';
import './App.css';
import ElfHeader from './ElfHeader';
import RadioLocal from './RadioLocal';
import RadioRemote from './RadioRemote';

class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
 return (                                                  
        <div className="App">                                 
            <ElfHeader/>                                     
            <main>                                            
                <section>                                     
                    <RadioLocal/>                              
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