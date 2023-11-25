import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    conversation_id: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = model("Message", MessageSchema);

export default Message;
