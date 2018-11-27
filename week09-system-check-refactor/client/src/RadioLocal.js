import React, { Component } from 'react';
import './App.css';


class RadioLocal extends Component {
    
    constructor(props) {
        super(props);
        this.dataEndPoints = [
        '/script-pusher/run-script?script=', 
        '/script-pusher/run-system-tool?script=',  
        '/script-pusher/get-host-name?script=',
        '/script-pusher/run-uptime-tool?script=',
         '/ssh-runner/run-script?script=',
        '/ssh-runner/run-system-tool?script='
        ];
        
        this.state = {
            allData:'',
            
        };
    }

 render() {
 return(
     <div className="App">                                 
                                        
            <main>                                            
                     <section>
                        <pre>{this.state.allData}</pre>
                    </section>
          
                </main>                                       
        </div>   
     )
 };
}
export default RadioLocal;
