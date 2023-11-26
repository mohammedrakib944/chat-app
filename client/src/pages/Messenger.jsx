import "./messenger.css";
import Conversation from "../components/Conversations";
import useGetConversations from "../hooks/useGetConversations";
import MessageBox from "../components/MessageBox";
import useGetMessages from "../hooks/useGetMessages";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Messenger = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const conversations = useGetConversations();
  const messages = useGetMessages({ conversation_id: currentChat?._id });
  const [socketIo, setSocketIo] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:8000");
    setSocketIo(socket);
  }, []);

  useEffect(() => {
    if (socketIo) {
      socketIo.on("welcome", (message) => {
        console.log("From socket: ", message);
      });
    }
  }, [socketIo]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <p className="header-text">All Conversations</p>
          <Conversation
            conversation={conversations}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <MessageBox currentChat={currentChat} messages={messages} />
          ) : (
            <span>Select a Conversation</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
