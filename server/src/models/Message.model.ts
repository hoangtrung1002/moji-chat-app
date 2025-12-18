import mongoose from "mongoose";

interface IMessage extends mongoose.Document {
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const messageSchema = new mongoose.Schema<IMessage>(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, trim: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

/*
 Compound index:
    create a look-up table for speed up fetching messages of a conversation,
    ordered by newest first
 */
messageSchema.index({ conversationId: 1, createdAt: -1 });

const MessageModel = mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;
