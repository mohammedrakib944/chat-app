import express from "express";
import Conversation from "../models/conversation.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.body;
    const savedConversation = await Conversation.create({
      members: [sender_id, receiver_id],
    });
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
