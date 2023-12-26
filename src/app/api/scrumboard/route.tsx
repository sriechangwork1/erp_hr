import boardList from '@crema/fakedb/apps/scrumboard/boardList';
import { NextRequest } from 'next/server';

let boardData = boardList;

export const GET = async (config: NextRequest) => {
  try {
    const params = Object.fromEntries(config.nextUrl.searchParams);
    const response = boardData.find(
      (board) => board.id === parseInt(params.id),
    ) || {
      id: params.id,
      name: 'New Board',
      list: [],
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
