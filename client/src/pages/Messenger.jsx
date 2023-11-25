import "./messenger.css";
import Conversation from "../components/Conversations";
import useGetConversations from "../hooks/useGetConversations";
import { useState } from "react";
import MessageBox from "../components/MessageBox";
import useGetMessages from "../hooks/useGetMessages";

const Messenger = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const conversations = useGetConversations();
  const messages = useGetMessages({ conversation_id: currentChat?._id });

  // console.log("Messages: ", messages);

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
            <MessageBox messages={messages} />
          ) : (
            <span>Select a Conversation</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
