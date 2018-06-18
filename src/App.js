import React, { Component } from "react";
import Tree from "react-tree-graph";
import BinaryTree from "./tree";
import "./App.css";
import "react-tree-graph/dist/style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      traversedList: [],
      data: {
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
      }
    };
  }

  componentDidMount() {
    var tree = new BinaryTree(34);
    tree.insert(23, "left");
    tree.insert(92, "right");
    tree.insertAt(23, 12, "left");
    tree.insertAt(23, 4, "right");
    tree.insertAt(4, 16, "left");
    tree.insertAt(4, 9, "right");
    tree.inorder();
    const traversedList = tree.getTraversed();
    this.setState({ traversedList }, () => {
      console.log(this.state.traversedList);
    });
  }
  render() {
    const { data, traversedList } = this.state;
    return (
      <div className="main-container">
        <Tree
          data={data}
          height={400}
          width={400}
          circleProps={{ fill: "red" }}
          svgProps={{
            transform: "rotate(90)"
          }}
          textProps={{
            transform: "rotate(270)"
          }}
        />
        <div className="numbers-container">
          <ul className="numbers-list">{traversedList.map((num,index) => <li className="numbers-list-item" key={index}>{num}</li>)}</ul>
        </div>
      </div>
    );
  }
}

export default App;
