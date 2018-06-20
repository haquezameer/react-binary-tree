import React, { Component } from "react";
import Tree from "react-tree-graph";
import {CSSTransition,TransitionGroup} from 'react-transition-group';


import {Controls} from './components';

import BinaryTree from "./lib/tree";
import animateNodeInTree from "./lib/animateNodeInTree";

import "./App.css";

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
      },
      selectedTraversal: ""
    };
    this.delayList = this.delayList.bind(this);
    this.updateTree = this.updateTree.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.animate = this.animate.bind(this);
    this.tree = new BinaryTree("34");
    this.resetTreeDiagram = this.resetTreeDiagram.bind(this);
  }

  componentDidMount() {
    this.tree.insert("23", "left");
    this.tree.insert("92", "right");
    this.tree.insertAt("23", "12", "left");
    this.tree.insertAt("23", "04", "right");
    this.tree.insertAt("04", "16", "left");
    this.tree.insertAt("04", "09", "right");
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
    const { data } = this.state;
    if (data.name === String(node)) {
      data.circleProps = { fill: "red" };
      this.setState({ data });
    } else {
      const updatedTreeData = animateNodeInTree(this.state.data, String(node));
      this.setState({ data: updatedTreeData });
    }
  }

  handleChange(selectedTraversal) {
    this.setState({ selectedTraversal, delayedList: [], traversedList: [] }, () => {
      this.resetTreeDiagram();
    });
  }

  animate() {
    const { selectedTraversal } = this.state;
    if (selectedTraversal.value === "inorder") {
      this.tree.inorder();
    } else if (selectedTraversal.value === "preorder") {
      this.tree.preorder();
    } else if (selectedTraversal.value === "postorder") {
      this.tree.postorder();
    }
    else 
      this.tree.levelordertraverse();
    const traversedList = this.tree.getTraversed();
    this.setState({ traversedList }, () => {
      this.delayList();
    });
  }

  resetTreeDiagram() {
    const data = {
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
    this.setState({ data }, () => {
      this.animate();
    });
  }

  render() {
    const { delayedList } = this.state;
    return (
      <div className="main-container">
        <div className="visualizer-container">
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
          <TransitionGroup component={null}>
            {delayedList.map((num, index) => (
            <CSSTransition key={index} timeout={500} classNames="fade">
              <li className="numbers-list-item" key={index}>
                {num}
              </li>
            </CSSTransition>
            ))}
            </TransitionGroup>
          </ul>
        </div>
        </div>
        <Controls selectedTraversal={this.state.selectedTraversal} handleChange={this.handleChange} />
      </div>
    );
  }
}

export default App;
