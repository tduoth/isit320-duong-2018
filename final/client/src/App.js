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
            
                                         
                </section>     
                       <footer>
              <p>&copy; 2018 </p>
          </footer>
            </main>                                           
        </div>                                                
    );                                                        
}        
}
export default App;