import ConversationModel from "../models/Conversation.model";
import MessageModel from "../models/Message.model";
import { BadRequestException } from "../utils/app-error";
import { updateConversationAfterCreateMessage } from "../utils/messageHelper";

export async function sendDirectMessageService(
  recipientId: string,
  content: string,
  conversationId: string,
  senderId: string
) {
  let conversation;
  if (!content) throw new BadRequestException("Thiếu nội dung");

  if (conversationId) {
    conversation = await ConversationModel.findById(conversationId);
  }
  if (!conversation) {
    conversation = new ConversationModel({
      type: "direct",
      participants: [
        { userId: senderId, joinedAt: new Date() },
        { userId: recipientId, joinedAt: new Date() },
      ],
      lastMessageAt: new Date(),
      unreadCounts: new Map<string, number>(),
    });
    await conversation.save();
  }
  const message = await MessageModel.create({
    conversationId: conversation._id,
    senderId,
    content,
  });

  updateConversationAfterCreateMessage(conversation, message, senderId);
  await conversation.save();
  return message;
}
