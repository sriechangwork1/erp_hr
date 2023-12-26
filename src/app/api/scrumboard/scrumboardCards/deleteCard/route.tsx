/*
import boardList from '@crema/fakedb/apps/scrumboard/boardList';
import {NextRequest} from "next/server";

let boardData = boardList;

export const POST = async (request:NextRequest) => {
  try {
    const reqBody = await request.json();
    const { boardId, listId, cardId } = reqBody;
    let selectedBoard = boardData.find((data) => data.id === boardId);
    let selectedList = selectedBoard.list.find((data) => data.id === listId);
    selectedList.cards = selectedList.cards.filter(
      (data) => data.id !== cardId,
    );
    selectedBoard.list = selectedBoard.list.map((data) =>
      data.id === selectedList.id ? selectedList : data,
    );
    boardData = boardData.map((data) =>
      data.id === selectedBoard.id ? selectedBoard : data,
    );
    return new Response(JSON.stringify(selectedBoard), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
*/
