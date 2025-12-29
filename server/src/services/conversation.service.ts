import ConversationModel from "../models/Conversation.model";
import { BadRequestException } from "../utils/app-error";

interface ICreateConversationData {
  type: "direct" | "group";
  name: string;
  memberIds: string[];
}

export async function createConversationService(
  data: ICreateConversationData,
  userId: string
) {
  const { type, name, memberIds } = data;
  console.log("create conversation....");

  if (
    !type ||
    (type === "group" && !name) ||
    !memberIds ||
    !Array.isArray(memberIds) ||
    memberIds.length === 0
  )
    throw new BadRequestException(
      "Tên nhóm và danh sách thành viên là bắt buộc"
    );
  let conversation;
  if (type === "direct") {
    const participantId = memberIds[0];
    conversation = await ConversationModel.findOne({
      type: "direct",
      "participants.userId": { $all: [userId, participantId] },
    });
    if (!conversation) {
      conversation = new ConversationModel({
        type: "direct",
        participants: [{ userId }, { userId: participantId }],
        lastMessageAt: new Date(),
      });
      await conversation.save();
    }
  }
  if (type === "group") {
    conversation = new ConversationModel({
      type: "group",
      participants: [{ userId }, ...memberIds.map((id) => ({ userId: id }))],
      group: { name, createdBy: userId },
      lastMessageAt: new Date(),
    });
    await conversation.save();
  }
  if (!conversation)
    throw new BadRequestException("Conversation type không hợp lệ");

  await conversation.populate([
    { path: "participants.userId", select: "displayName avatarUrl" },
    { path: "seenBy", select: "displayName avatarUrl" },
    { path: "lastMessage.senderId", select: "displayName avatarUrl" },
  ]);
  return conversation;
}

export async function getConversationService(userId: string) {
  const conversations = await ConversationModel.find({
    "participants.userId": userId,
  })
    .sort({ lastMessageAt: -1, updatedAt: -1 })
    .populate({
      path: "participants.userId",
      select: "displayName avatarUrl",
    })
    .populate({
      path: "lastMessage.senderId",
      select: "displayName avatarUrl",
    })
    .populate({
      path: "seenBy",
      select: "displayName avatarUrl",
    });

  const formatted = conversations.map((conversation) => {
    const participants = (conversation.participants || []).map(
      (participant) => {
        const member = participant.userId as any;
        return {
          _id: member._id,
          displayName: member.displayName,
          avatarUrl: member?.avatarUrl ?? null,
          joinedAt: participant.joinedAt,
        };
      }
    );
    return {
      ...conversation.toObject(),
      // unreadCounts: mapToObject(conversation.unreadCounts),
      unreadCounts: conversation.unreadCounts || {},
      participants,
    };
  });
  return formatted;
}
