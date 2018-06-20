import React from "react";
import Select from "react-select";

import "./Controls.css";
import "react-select/dist/react-select.css";

const Controls = ({ selectedTraversal, handleChange }) => (
  <div className="controls-container">
    <Select
      name="sort-select"
      value={selectedTraversal && selectedTraversal.value}
      onChange={handleChange}
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
);

export default Controls;
