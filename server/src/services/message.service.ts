import ConversationModel, {
  ConversationDocument,
} from "../models/Conversation.model";
import MessageModel from "../models/Message.model";
import { io } from "../socket";
import { BadRequestException } from "../utils/app-error";
import {
  emitNewMessage,
  updateConversationAfterCreateMessage,
} from "../utils/messageHelper";

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
  emitNewMessage(io, conversation, message);
  return message;
}

export async function getMessagesService(
  conversationId: string,
  limit: number,
  cursor?: string
) {
  const query: Record<string, unknown> = { conversationId };
  if (cursor) {
    query.createAt = { $lt: new Date(cursor) };
  }
  let messages = await MessageModel.find(query)
    .sort({ createdAt: -1 })
    .limit(limit + 1); // limit = 10 -> if messages have 11 items that means we can load more

  let nextCursor = null;
  if (messages.length > limit) {
    const nextMessage = messages[messages.length - 1];
    nextCursor = nextMessage.createdAt.toISOString();
    messages.pop();
  }
  messages = messages.reverse();
  return { messages, nextCursor };
}

export async function sendGroupMessageService(
  conversationId: string,
  content: string,
  senderId: string,
  conversation?: ConversationDocument
) {
  if (!conversation)
    throw new BadRequestException("Không tìm thấy cuộc trò chuyện");
  if (!content) throw new BadRequestException("Thiếu nội dung");
  const message = await MessageModel.create({
    conversationId,
    senderId,
    content,
  });
  updateConversationAfterCreateMessage(conversation, message, senderId);
  await conversation.save();
  emitNewMessage(io, conversation, message);
  return message;
}
