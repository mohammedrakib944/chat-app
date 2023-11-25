import React from "react";
import "./messagebox.css";

const Bubble = ({ own }) => {
  return (
    <div className="bubble">
      <div className={`chat ${own && "ownChat"}`}>
        <div className="name">Rakib</div>
        <div className={`${own ? "own" : "text"}`}>Hi There how are you?</div>
      </div>
    </div>
  );
};

export default Bubble;
