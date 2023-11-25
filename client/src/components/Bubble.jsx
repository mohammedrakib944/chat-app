import React from "react";
import "./messagebox.css";

const Bubble = ({ message, own }) => {
  return (
    <div className="bubble">
      <div className={`chat ${own && "ownChat"}`}>
        <div className="name">{message?.sender}</div>
        <div className={`${own ? "own" : "text"}`}>{message?.text}</div>
      </div>
    </div>
  );
};

export default Bubble;
