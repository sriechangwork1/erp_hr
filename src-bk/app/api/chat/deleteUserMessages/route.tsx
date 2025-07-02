import connectionList from '@crema/fakedb/apps/chat/connectionList';
import chatList from '@crema/fakedb/apps/chat/chatList';
import { NextRequest } from 'next/server';
import { ConnectionType, MessageObjType } from '@crema/types/models/apps/Chat';

let connectionData = connectionList;
let chatData = chatList;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { channelId } = reqBody;
    chatData = chatData.filter((chat: MessageObjType) => chat.channelId !== channelId);
    const user = connectionData.find(
      (connection: ConnectionType) => connection.channelId === channelId,
    )! as ConnectionType;
    // let user.lastMessage;
    connectionData = connectionData.map((item: ConnectionType) => (item.id === user.id ? user : item));
    return new Response(JSON.stringify(connectionData), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
