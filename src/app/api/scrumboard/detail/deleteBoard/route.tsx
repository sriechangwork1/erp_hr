import boardList from '@crema/fakedb/apps/scrumboard/boardList';
import { NextRequest } from 'next/server';

let boardData = boardList;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { boardId } = reqBody;
    boardData = boardData.filter((data) => data.id !== boardId);
    return new Response(JSON.stringify(boardId), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
