import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./TraversedList.css";

// Renders the list of nodes passed in as props and add transition on enter and exit using React Transition group
const TraversedList = ({ delayedList }) => (
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
);

export default TraversedList;
