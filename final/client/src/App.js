import React, { Component } from 'react';
import './App.css';
import ElfHeader from './ElfHeader';
import RadioLocal from './buttonLocal';
import RadioRemote from './buttonRemote';




class App extends Component {
    
        render() {
    
 return (                                                  
        <div className="App">  
            <ElfHeader/>                                     
            <main>                                            
                <section>                                     
                    <buttonLocal/>    
                    <buttonRemote/>
                                         
                </section>         
            </main>                                           
        </div>                                                
    );                                                        
}        
}
export default App;