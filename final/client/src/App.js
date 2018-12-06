import React, { Component } from 'react';
import './App.css';
import ElfHeader from './ElfHeader';
import RadioLocal from './RadioLocal';
import RadioRemote from './RadioRemote';




class App extends Component {
    
        render() {
    
 return (                                                  
        <div className="App">  
            <ElfHeader/>                                     
            <main>                                            
                <section>                                     
                    <RadioLocal/>    
                    <RadioRemote/>
                    
                <p>export PORT=30025</p>
                <p>export SERVER_PORT=30026</p>
                <p>export ELF_SCREF_PORT=30030</p>
                <p>export ELF_SYSTEM_CHECK_PORT=30034</p>
                <p>export MIDTERM_PORT=30035</p>
                                         
                </section>         
            </main>                                           
        </div>                                                
    );                                                        
}        
}
export default App;