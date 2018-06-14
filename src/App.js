import React, { Component } from 'react';
import Tree from 'react-tree-graph';
import './App.css';
// import 'react-tree-graph/dist/style.css'
let data = {
  name: 'Parent',
  children: [{
      name: 'Child One'
  }, {
      name: 'Child Two'
  }]
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tree data={data} height={400}
    width={400} circleProps={{fill: 'red'}}/>
        <div>
          some numbers
          </div>
      </div>
    );
  }
}

export default App;
