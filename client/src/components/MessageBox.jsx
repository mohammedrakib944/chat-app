import { useEffect, useRef, useState } from "react";
import "./messagebox.css";
import Bubble from "./Bubble";
import usePostMessage from "../hooks/usePostMessage";
import { useUserContext } from "../context/userContext";

const MessageBox = ({ socket, currentChat, chats, setChats }) => {
  const { user } = useUserContext();
  const postMessage = usePostMessage();
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = {
      conversation_id: currentChat._id,
      sender: user,
      text: newMessage,
    };

    // Find the receiver username
    const receiverUsername = currentChat.members.find(
      (member) => member !== user
    );

    // send to socket server
    socket.current.emit("send:message", {
      senderId: user,
      receiverUsername,
      text: newMessage,
    });
    // send to mongoDB
    postMessage(sendData);
    setChats((prev) => [...prev, sendData]);
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, handleSubmit]);

  return (
    <div className="boxWrapper">
      <div className="boxing">
        {chats &&
          chats.map((message, index) => (
            <div ref={scrollRef} key={index}>
              <Bubble message={message} own={message.sender === user} />
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
