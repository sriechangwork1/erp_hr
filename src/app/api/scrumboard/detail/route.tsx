import boardList from '@crema/fakedb/apps/scrumboard/boardList';
import { NextRequest } from 'next/server';

let boardData = boardList;

export const GET = async (request: NextRequest) => {
  try {
    return new Response(JSON.stringify(boardData), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { board } = reqBody;
    const newBoard = {
      id: Math.floor(Math.random() * 10000),
      name: board.name,
      list: [],
    };
    boardData = boardData.concat(newBoard);
    return new Response(JSON.stringify(boardData), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { board } = reqBody;
    boardData = boardData.map((data) => (data.id === board.id ? board : data));
    return new Response(JSON.stringify(board), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
