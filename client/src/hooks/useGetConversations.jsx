import { useState, useEffect } from "react";
import axios from "axios";

const useGetConversations = () => {
  const [conversation, setConversation] = useState([]);
  async function getData() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/conversation/shohan  "
      );
      setConversation(res.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return conversation;
};

export default useGetConversations;
