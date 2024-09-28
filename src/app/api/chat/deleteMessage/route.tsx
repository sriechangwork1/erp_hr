import connectionList from '@crema/fakedb/apps/chat/connectionList';
import chatList from '@crema/fakedb/apps/chat/chatList';
import { NextRequest } from 'next/server';
import { ConnectionType, MessageDataType, MessageObjType } from '@crema/types/models/apps/Chat';

let connectionData = connectionList;
let chatData = chatList;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { channelId, messageId } = reqBody;
    const userMessages = chatData.find((chat: MessageObjType) => chat.channelId === channelId)!;
    let user = connectionData.find((connection) => connection.channelId === channelId)!;
    if (userMessages) {
      userMessages.messageData = userMessages.messageData.filter((item) => item.id !== messageId);
      if (user?.lastMessage?.id === messageId) {
        const lastMessage = userMessages.messageData[userMessages.messageData.length - 1] as MessageDataType;
        user = {
          ...user,
          lastMessage: {
            id: lastMessage.id!,
            message: lastMessage.message!,
            type: '',
            time: lastMessage.time!,
          },
        };
        connectionData = connectionData.map((item: ConnectionType) => (item.id === user?.id ? user : item))!;
      }
    }
    return new Response(JSON.stringify({ connectionData, userMessages }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
