import { useEffect, useRef, useState } from "react";
import "./messagebox.css";
import Bubble from "./Bubble";
import usePostMessage from "../hooks/usePostMessage";
import { useUserContext } from "../context/userContext";

const MessageBox = ({ socket, currentChat, chats, setChats }) => {
  const { user } = useUserContext();
  const postMessage = usePostMessage();
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const scrollRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newMessage) return;

    const sendData = {
      conversation_id: currentChat._id,
      sender: user,
      text: newMessage,
      file,
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
      file,
    });
    // send to mongoDB
    // postMessage(sendData);

    // Update the chats state
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChats((prev) => [...prev, { ...sendData, image: reader.result }]);
      };
      reader.readAsDataURL(file);
    } else {
      setChats((prev) => [...prev, sendData]);
    }
    setNewMessage("");
    setFile(null);
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
      {file && <span className="file-att">1 file attached</span>}
      <form className="sendForm" onSubmit={handleSubmit}>
        <label htmlFor="fileselect" className="addFile">
          +
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleFileChange}
          id="fileselect"
        />
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
