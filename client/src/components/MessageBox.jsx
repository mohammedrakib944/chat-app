import { useState } from "react";
import "./messagebox.css";
import Bubble from "./Bubble";
import usePostMessage from "../hooks/usePostMessage";

const MessageBox = ({ currentChat, messages }) => {
  const postMessage = usePostMessage();
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = {
      conversation_id: currentChat._id,
      sender: "rakib",
      text: newMessage,
    };
    postMessage(sendData);
    setNewMessage("");
  };

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
      <form className="sendForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="inputSend"
          placeholder="Type.."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageBox;
