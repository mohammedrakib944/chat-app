import "./messenger.css";
import Conversation from "../components/Conversations";
import useGetConversations from "../hooks/useGetConversations";
import MessageBox from "../components/MessageBox";
import useGetMessages from "../hooks/useGetMessages";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useUserContext } from "../context/userContext";

const Messenger = () => {
  const { user } = useUserContext();
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState(null);
  const conversations = useGetConversations();
  const socket = useRef();
  let messages = useGetMessages({ conversation_id: currentChat?._id });

  useEffect(() => {
    socket.current = io("http://localhost:8000");
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit("add:user", user);
      socket.current.on("get:users", (users) => {
        // console.log("Users:", users);
      });
      socket.current.on("get:message", (data) => {
        setChats((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  useEffect(() => {
    setChats(messages);
  }, [messages]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <p className="header-text">{user} - Conversations</p>
          <Conversation
            conversation={conversations}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <MessageBox
              socket={socket}
              currentChat={currentChat}
              chats={chats}
              setChats={setChats}
            />
          ) : (
            <div className="itemcenter">Select a Conversation</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
