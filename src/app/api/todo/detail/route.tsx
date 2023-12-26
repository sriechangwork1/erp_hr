import todoList from '@crema/fakedb/apps/todo/todoList';
import { NextRequest } from 'next/server';

let todoData = todoList;
export const GET = async (request: NextRequest) => {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);

    const response = todoData.find((task) => task.id === parseInt(params.id));
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { task } = reqBody;
    todoData = todoData.map((item) => (item?.id === task?.id ? task : item));
    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
