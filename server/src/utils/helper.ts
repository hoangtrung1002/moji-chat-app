import { IParticipant } from "../models/Conversation.model";

function mapToObject(map?: Map<string, number>) {
  return map ? Object.fromEntries(map.entries()) : {};
}

export function formattedParticipants(participants: IParticipant[]) {
  const formatted = (participants || []).map((participant) => {
    const member = participant.userId as any;
    return {
      _id: member._id,
      displayName: member.displayName,
      avatarUrl: member?.avatarUrl ?? null,
      joinedAt: participant.joinedAt,
    };
  });
  return formatted;
}
