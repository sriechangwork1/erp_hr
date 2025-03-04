import todoList from '@crema/fakedb/apps/todo/todoList';
import { NextRequest } from 'next/server';

let todoData = todoList;

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { taskIds, status } = reqBody;
    todoData = todoData.map((task) => {
      if (taskIds.includes(task.id)) {
        task.isStarred = !!status;
        return task;
      } else {
        return task;
      }
    });
    const updatedTasks = todoData.filter((task) => taskIds.includes(task.id));

    return new Response(JSON.stringify(updatedTasks), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
