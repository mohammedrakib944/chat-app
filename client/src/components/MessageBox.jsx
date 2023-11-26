import { useEffect, useRef, useState } from "react";
import "./messagebox.css";
import Bubble from "./Bubble";
import usePostMessage from "../hooks/usePostMessage";

const MessageBox = ({ currentChat, messages }) => {
  const postMessage = usePostMessage();
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = {
      conversation_id: currentChat._id,
      sender: "tomal",
      text: newMessage,
    };
    postMessage(sendData);
    messages.push(sendData);
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, handleSubmit]);

  return (
    <div className="boxWrapper">
      <div className="boxing">
        {messages &&
          messages.map((message, index) => (
            <div ref={scrollRef} key={index}>
              <Bubble message={message} own={message.sender === "tomal"} />
            </div>
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
