import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import elfDebugEnzyme from './ElfDebugEnzyme';

configure({adapter: new Adapter()});

describe('basic suite',  () => {
  
  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<app/>, div);
      ReactDOM.unmountComponentAtNode(div);
  });
  
  fit('renders h1 header test', () => {
    const wrapper = shallow(<App/>);
    console.log('TESTER', wrapper.find('legend').first().debug());
  });
  it('renders h1 header',  () =>{
    const wrapper= shallow(<App/>);
    const unknown= <h1>AWS Provision</h1>;
    elfDebugEnzym.getLast(wrapper, 'h1', true);
    console.log(wrapper.find('h1').debug());
    expect(wrapper.contains(unknown)).toEqual(true);
  });
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
