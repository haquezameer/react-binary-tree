import React, { Component } from "react";
import Tree from "react-tree-graph";
import BinaryTree from "./tree";
import animateNodeInTree from './animateNodeInTree';
import "./App.css";
// import "react-tree-graph/dist/style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      traversedList: [],
      delayedList: [],
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
    this.delayList = this.delayList.bind(this);
    this.updateTree = this.updateTree.bind(this);
  }

  componentDidMount() {
    var tree = new BinaryTree('34');
    tree.insert('23', "left");
    tree.insert('92', "right");
    tree.insertAt('23', '12', "left");
    tree.insertAt('23', '04', "right");
    tree.insertAt('04', '16', "left");
    tree.insertAt('04', '09', "right");
    tree.preorder();
    const traversedList = tree.getTraversed();
    this.setState({ traversedList }, () => {
      this.delayList();
    });
  }

  delayList() {
    const { traversedList } = this.state;
    traversedList.forEach((listItem, index) => {
      // const i =index;
      setTimeout(() => {
        this.setState({ delayedList: [...this.state.delayedList, listItem] });
        this.updateTree(listItem);
      }, 1500 * index);
    });
  }

  updateTree(node) {
    const {data} = this.state;
    if(data.name === String(node)){
      data.circleProps = {fill: 'red'};
      this.setState({data});
    }
    else{
      const updatedTreeData = animateNodeInTree(this.state.data,String(node));
      this.setState({data: updatedTreeData});
    }
  }

  render() {
    const { delayedList } = this.state;
    return (
      <div className="main-container">
        <Tree
          data={this.state.data}
          height={400}
          width={400}
          svgProps={{
            transform: "rotate(90)"
          }}
          textProps={{
            transform: "rotate(270)"
          }}
          animated={true}
        />
        <div className="numbers-container">
          <ul className="numbers-list">
            {delayedList.map((num, index) => (
              <li className="numbers-list-item" key={index}>
                {num}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
