import React, {useState} from "react";
import {createPortal} from "react-dom";

const Sidebar = () => {
  const [modal, setmodal] = useState({on: false, type: null});
  return (
    <nav>
      <div className="icon-wrapper">
        <i
          className="fa-solid fa-chart-simple"
          onClick={() => {
            setmodal({on: true, type: "stats"});
          }}
        ></i>
      </div>
      <div className="icon-wrapper">
        <i
          className="fa-solid fa-question"
          onClick={() => {
            setmodal({on: true, type: "help"});
          }}
        ></i>
      </div>
      <div className="icon-wrapper">
        <i
          className="fa-solid fa-gear"
          onClick={() => {
            setmodal({on: true, type: "settings"});
          }}
        ></i>
      </div>
    </nav>
  );
};

export default Sidebar;

// set up sidebar and its functionality

// ADD GAME DIFFICULTY //Add a timer: Add a time limit for each guess, making the game more challenging and creating an exciting sense of urgency.
// different modes. etc no green words only yellow ones.

// add win lose settings help modal
// animations and mobile responsiveness
