import React, { Component } from 'react';
import './App.css';


class RadioLocal extends Component {

 render() {
 return(
     <div className="App">                                 
                                        
            <main>                                            
                <section>                                     
                    {radioLocal}                              
                                         
                </section>         
                     <section>
                        <pre>{this.state.allData}</pre>
                    </section>
          
                </main>                                       
        </div>   
     )
 };
}
export default RadioLocal;
