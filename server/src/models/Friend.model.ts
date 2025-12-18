import mongoose from "mongoose";

interface IFriend extends mongoose.Document {
  userA: mongoose.Types.ObjectId;
  userB: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const friendSchema = new mongoose.Schema<IFriend>(
  {
    userA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

/* 
    - Normalize the order of two user IDs
    - Ensures (A, B) and (B, A) become the same document
    ex: (Alice, Bob) === (Bob, Alice)
*/

friendSchema.pre("save", async function () {
  if (!this.isNew) return;

  const a = this.userA.toString();
  const b = this.userB.toString();

  if (a > b) {
    [this.userA, this.userB] = [this.userB, this.userA];
  }
});

// create unique index for pair user
friendSchema.index({ userA: 1, userB: 1 }, { unique: true });

const friendModel = mongoose.model<IFriend>("Friend", friendSchema);
export default friendModel;
