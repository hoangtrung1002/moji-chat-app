import mongoose from "mongoose";

interface IParticipant extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  joinedAt: Date;
}
interface IGroup extends mongoose.Document {
  name: string;
  createdBy: mongoose.Types.ObjectId;
}
interface ILastMessage {
  _id: string;
  content: string | null;
  senderId: mongoose.Types.ObjectId;
  createdAt: Date | null;
}

interface IConversation extends mongoose.Document {
  type: "direct" | "group";
  participants: IParticipant[];
  group: IGroup;
  lastMessageAt: Date;
  seenBy: mongoose.Types.ObjectId[];
  lastMessage: ILastMessage;
  unreadCounts: Map<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

const participantsSchema = new mongoose.Schema<IParticipant>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
  }
);

const groupSchema = new mongoose.Schema<IGroup>(
  {
    name: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
  },
  { _id: false }
);

const lastMessageSchema = new mongoose.Schema<ILastMessage>(
  {
    _id: { type: String },
    content: { type: String, default: null },
    senderId: { type: mongoose.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: null },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema<IConversation>(
  {
    type: { type: String, enum: ["direct", "group"], required: true },
    participants: { type: [participantsSchema], required: true },
    group: { type: groupSchema },
    lastMessageAt: { type: Date },
    lastMessage: { type: lastMessageSchema, default: null },
    unreadCounts: { type: Map, of: Number, default: {} },
  },
  { timestamps: true }
);

conversationSchema.index({ "participants.userId": 1, lastMessageAt: -1 });

const ConversationModel = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);
export default ConversationModel;
