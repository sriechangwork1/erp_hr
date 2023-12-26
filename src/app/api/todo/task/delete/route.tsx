import todoList from '@crema/fakedb/apps/todo/todoList';
import { NextRequest } from 'next/server';
let todoData = todoList;

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { task } = reqBody;
    todoData = todoData.filter((item) => (item.id === task.id ? task : item));
    return new Response(JSON.stringify(task), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
