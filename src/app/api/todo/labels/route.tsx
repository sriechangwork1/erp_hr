import { labelList, onGetLabel } from '@crema/fakedb/apps/todo/labelList';
import todoList from '@crema/fakedb/apps/todo/todoList';
import { NextRequest } from 'next/server';

let todoData = todoList;
export const GET = async () => {
  try {
    return new Response(JSON.stringify(labelList), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { taskIds, type } = reqBody;
    todoData = todoData.map((task) => {
      if (taskIds.includes(task.id)) {
        if (task.label.some((label) => label.id === +type)) {
          task.label = task.label.filter((label) => label.id !== +type);
          return task;
        } else {
          task.label = task.label.concat(onGetLabel(type));
          return task;
        }
      } else {
        return task;
      }
    });
    const updatedTasks = todoData.filter((task) => taskIds.includes(task.id));
    return new Response(JSON.stringify(updatedTasks), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
