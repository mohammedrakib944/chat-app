import axios from "axios";
import { useState, useEffect } from "react";

const usePostMessage = () => {
  const [data, setData] = useState("");
  async function postMessage() {
    if (!data) return;
    try {
      await axios({
        method: "post",
        url: "http://localhost:8000/api/message/",
        data,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  useEffect(() => {
    postMessage();
  }, [data]);

  return setData;
};

export default usePostMessage;
