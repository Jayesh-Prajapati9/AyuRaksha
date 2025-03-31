import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    image: {
      type: String,
    },
    audio: {
      type: String,
    },
    video: {
      type: String,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return !this.isGroupChat;
      },
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: function () {
        return !this.receiverId;
      },
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
