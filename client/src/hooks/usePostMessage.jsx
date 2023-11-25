import axios from "axios";
import { useState, useEffect } from "react";

const usePostMessage = () => {
  const [data, setData] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  async function postMessage() {
    if (!data) return;
    try {
      await axios({
        method: "post",
        url: "http://localhost:8000/api/message/",
        data,
      });
      setIsSuccess(true);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  useEffect(() => {
    postMessage();
  }, [data]);

  return [setData, isSuccess];
};

export default usePostMessage;
