import React from "react";
import "./messagebox.css";
import { format } from "timeago.js";

const Bubble = ({ message, own }) => {
  // console.log("Image: ", image);
  const handleDownload = (image) => {
    // Trigger a click on a hidden download link to start the download
    const downloadLink = document.createElement("a");
    downloadLink.href = image;
    downloadLink.download = "downloaded-file.png";
    downloadLink.click();
  };
  return (
    <div className="bubble">
      <div className={`chat ${own && "ownChat"}`}>
        <div className="flexing">
          <div className="name text-black">{message?.sender}</div>
          <div className="name">{format(message?.createdAt)}</div>
        </div>
        {message?.image && (
          <div className="imageWrapper">
            <img
              src={message.image}
              alt="Preview"
              style={{
                width: 300,
                height: 200,
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <button
              className="downloadbtn"
              onClick={() => handleDownload(message?.image)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>
          </div>
        )}
        <div className={`${own ? "own" : "text"}`}>{message?.text}</div>
      </div>
    </div>
  );
};

export default Bubble;
