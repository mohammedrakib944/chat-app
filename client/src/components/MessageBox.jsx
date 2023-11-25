import React from "react";
import "./messagebox.css";
import Bubble from "./Bubble";

const MessageBox = ({ messages }) => {
  //   console.log("Messages: ", messages);
  return (
    <div className="boxWrapper">
      <div className="boxing">
        <Bubble />
        <Bubble own />
        <Bubble own />
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble own />
        <Bubble own />
      </div>
      <form className="sendForm">
        <input type="text" className="inputSend" placeholder="Type.." />
        <button>Send</button>
      </form>
    </div>
  );
};

export default MessageBox;
