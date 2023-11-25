import React from "react";
import "./messagebox.css";
import Bubble from "./Bubble";

const MessageBox = ({ messages }) => {
  return (
    <div className="boxWrapper">
      <div className="boxing">
        {messages &&
          messages.map((message) => (
            <Bubble
              key={message?._id}
              message={message}
              own={message.sender === "rakib"}
            />
          ))}
      </div>
      <form className="sendForm">
        <input type="text" className="inputSend" placeholder="Type.." />
        <button>Send</button>
      </form>
    </div>
  );
};

export default MessageBox;
