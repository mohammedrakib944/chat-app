import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../context/userContext";

const useGetConversations = () => {
  const [conversation, setConversation] = useState([]);
  const { user } = useUserContext();
  async function getData() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/conversation/" + user
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
