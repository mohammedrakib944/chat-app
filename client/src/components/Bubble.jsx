import React from "react";
import "./messagebox.css";
import { format } from "timeago.js";

const Bubble = ({ message, own }) => {
  return (
    <div className="bubble">
      <div className={`chat ${own && "ownChat"}`}>
        <div className="flexing">
          <div className="name text-black">{message?.sender}</div>
          <div className="name">{format(message?.createdAt)}</div>
        </div>
        <div className={`${own ? "own" : "text"}`}>{message?.text}</div>
      </div>
    </div>
  );
};

export default Bubble;
