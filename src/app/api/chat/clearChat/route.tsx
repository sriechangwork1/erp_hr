/*
import connectionList from '@crema/fakedb/apps/chat/connectionList';
import chatList from '@crema/fakedb/apps/chat/chatList';
import { NextRequest } from 'next/server';
import { ConnectionType } from '@crema/types/models/apps/Chat';

let connectionData = connectionList;
let chatData = chatList;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { channelId } = reqBody;
    let user: ConnectionType = connectionData.find(
      (connection: ConnectionType) => connection.channelId === channelId,
    );
    user = { ...user, lastMessage: null };

    connectionData = connectionData.map((item) =>
      item.channelId === user.channelId ? user : item,
    );
    return new Response(JSON.stringify({ connectionData, userMessages: [] }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
*/
