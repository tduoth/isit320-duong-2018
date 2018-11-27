import React, { Component } from 'react';
import './App.css';
import ElfHeader from './ElfHeader';
import RadioLocal from './RadioLocal';


class App extends Component {
    
        render() {
    
 return (                                                  
        <div className="App">                                 
            <ElfHeader/>                                     
            <main>                                            
                <section>                                     
                    <RadioLocal/>                             
                                         
                </section>         
            </main>                                           
        </div>                                                
    );                                                        
}        
}
export default App;