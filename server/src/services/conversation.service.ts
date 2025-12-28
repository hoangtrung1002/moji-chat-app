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
  }
}
