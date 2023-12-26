import boardList from '@crema/fakedb/apps/scrumboard/boardList';
import { NextRequest } from 'next/server';

let boardData = boardList;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { boardId, list } = reqBody;
    const newList = {
      id: Math.floor(Math.random() * 10000),
      cards: [],
      name: list.name,
    };
    const updatedBoardList = boardData.map((data) => {
      if (data.id === boardId) {
        data.list = data.list.concat(newList);
        return data;
      } else {
        return data;
      }
    });
    const updatedBoard = updatedBoardList.find((data) => data.id === boardId);
    return new Response(JSON.stringify(updatedBoard), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { boardId, list } = reqBody;
    const updatedBoardList = boardData.map((data) => {
      if (data.id === boardId) {
        data.list = data.list.map((item) =>
          item.id === list.id ? list : item,
        );
        return data;
      } else {
        return data;
      }
    });
    const updatedBoard = updatedBoardList.find((data) => data.id === boardId);
    return new Response(JSON.stringify(updatedBoard), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
