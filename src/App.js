import React, { Component } from "react";
import Tree from "react-tree-graph";
import "./App.css";
import "react-tree-graph/dist/style.css";
let data = {
  name: "34",
  children: [
    {
      name: "92"
    },
    {
      name: "23",
      children: [
        {
          name: "04",
          children: [
            {
              name: "09"
            },
            { name: "16" }
          ]
        },
        {
          name: "12"
        }
      ]
    }
  ]
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tree
          data={data}
          height={400}
          width={400}
          circleProps={{ fill: "red" }}
          svgProps={{
            transform: 'rotate(90)'
          }}
          textProps={{
            transform: 'rotate(270)'
          }}
        />
        <div>some numbers</div>
      </div>
    );
  }
}

export default App;
