import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const messageModel = ('Message', messageSchema)

export default messageModel;