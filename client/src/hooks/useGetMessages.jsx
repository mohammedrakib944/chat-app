import { useState, useEffect } from "react";
import axios from "axios";

const useGetMessages = ({ conversation_id }) => {
  const [messages, setMessages] = useState([]);
  async function getData() {
    if (!conversation_id) return;
    try {
      const res = await axios.get(
        "http://localhost:8000/api/message/" + conversation_id
      );
      setMessages(res.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  useEffect(() => {
    getData();
  }, [conversation_id]);

  return messages;
};

export default useGetMessages;
