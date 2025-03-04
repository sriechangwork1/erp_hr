import boardList from '@crema/fakedb/apps/scrumboard/boardList';
import { NextRequest } from 'next/server';
import { BoardType, CardListType, CardType } from '@crema/types/models/apps/ScrumbBoard';

let boardData = boardList;

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { cardId, sourceLaneId, categoryId, position, boardId } = reqBody;
    const updatedBoardList = boardData.map((data: BoardType) => {
      if (data.id === boardId) {
        const sourceLane = data.list.find((item: CardListType) => item.id === sourceLaneId);
        const card = sourceLane?.cards.find((item: CardType) => item.id === cardId);
        if (sourceLane) {
          sourceLane.cards = sourceLane.cards ? sourceLane.cards.filter((item) => item.id !== cardId) : [];
        }
        const targetLane = data.list.find((item: CardListType) => item.id === categoryId);
        if (targetLane?.cards) {
          targetLane?.cards.splice(position, 0, card!);
        } else {
          targetLane!.cards = [card!];
        }
        data.list = data.list.map((item: CardListType) => {
          if (item.id === sourceLane?.id) return sourceLane;
          return item;
        }) as CardListType[];
        return data;
      }
      return data;
    });
    const updatedBoard = updatedBoardList.find((data) => data.id === boardId);

    return new Response(JSON.stringify(updatedBoard), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
