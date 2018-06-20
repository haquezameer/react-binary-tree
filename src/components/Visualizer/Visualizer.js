import React from "react";
import Tree from "react-tree-graph";

import TraversedList from "./TraversedList";

import "./Visualizer.css";

const Visualizer = ({ data, delayedList }) => (
  <div className="visualizer-container">
    {/* Render Tree with data passed as prop */}
    <Tree
      data={data}
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
    {/* Render List of traversed nodes passed as prop */}
    <TraversedList delayedList={delayedList} />
  </div>
);

export default Visualizer;
