import React, { Component } from "react";
import Tree from "react-tree-graph";
import Select from "react-select";
import {CSSTransition,TransitionGroup} from 'react-transition-group';

import BinaryTree from "./tree";
import animateNodeInTree from "./animateNodeInTree";

import "./App.css";
import "react-select/dist/react-select.css";

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
      selectedSort: ""
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

  handleChange(selectedSort) {
    this.setState({ selectedSort, delayedList: [], traversedList: [] }, () => {
      this.resetTreeDiagram();
    });
  }

  animate() {
    const { selectedSort } = this.state;
    if (selectedSort.value === "inorder") {
      this.tree.inorder();
    } else if (selectedSort.value === "preorder") {
      this.tree.preorder();
    } else if (selectedSort.value === "postorder") {
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
        <div className="controls-container">
          <Select
            name="sort-select"
            value={this.state.selectedSort && this.state.selectedSort.value}
            onChange={this.handleChange}
            className="select-field"
            options={[
              { label: "preorder", value: "preorder" },
              { label: "inorder", value: "inorder" },
              { label: "postorder", value: "postorder" },
              { label: "level order", value: "level order" }
            ]}
            clearable={false}
          />
        </div>
      </div>
    );
  }
}

export default App;
