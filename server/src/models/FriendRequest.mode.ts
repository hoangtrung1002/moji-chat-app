import mongoose from "mongoose";

interface IFriendRequest extends mongoose.Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const friendRequestSchema = new mongoose.Schema<IFriendRequest>(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, maxLength: 300 },
  },
  { timestamps: true }
);

// avoid duplicating request
friendRequestSchema.index({ from: 1, to: 1 }, { unique: true });

friendRequestSchema.index({ from: 1 });
friendRequestSchema.index({ to: 1 });

const friendRequestModel = mongoose.model<IFriendRequest>(
  "FriendRequest",
  friendRequestSchema
);
export default friendRequestModel;
