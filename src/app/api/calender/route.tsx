import todoList from '@crema/fakedb/apps/todo/todoList';
import folderList from '@crema/fakedb/apps/todo/folderList';
import { labelList } from '@crema/fakedb/apps/todo/labelList';
import { staffList } from '@crema/fakedb/apps/todo/staffList';
import priorityList from '@crema/fakedb/apps/todo/priorityList';
import { NextRequest } from 'next/server';
import { TodoType } from '@crema/types/models/apps/Todo';

let todoData = todoList;

const onGetTaskList = (name: string, data: TodoType[]) => {
  switch (name) {
    case 'all': {
      return data.filter((task) => task.folderValue !== 126);
    }

    case 'starred': {
      return data.filter((task) => task.folderValue !== 126 && task.isStarred);
    }

    case 'priority': {
      return data.filter(
        (task) => task.folderValue !== 126 && task.priority.type === 1,
      );
    }

    case 'scheduled': {
      const folderId = folderList.find((folder) => folder.alias === name)?.id;
      return data.filter((task) => task.folderValue === folderId);
    }

    case 'today': {
      const folderId = folderList.find((folder) => folder.alias === name)?.id;
      return data.filter((task) => task.folderValue === folderId);
    }

    case 'completed': {
      return data.filter(
        (task) => task.folderValue !== 126 && task.status === 3,
      );
    }

    case 'deleted': {
      return data.filter((task) => task.folderValue === 126);
    }
    default: {
      return data;
    }
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const params: any = Object.fromEntries(request.nextUrl.searchParams);
    let folderTaskList = [];
    if (params.type === 'folder') {
      folderTaskList = onGetTaskList(params.name, todoData);
    } else {
      const labelType = labelList.find((label) => label.alias === params.name);
      folderTaskList = todoData.filter((task) => {
        const label = task.label.find((label) => label.id === labelType?.id);
        if (label && task.folderValue !== 126) {
          return task;
        } else return null;
      });
    }
    const index = params.page * 15;
    const count = folderTaskList.length;
    const data =
      folderTaskList.length > 15
        ? folderTaskList.slice(index, index + 15)
        : folderTaskList;

    return new Response(JSON.stringify({ data, count }), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { task } = reqBody;
    task.assignedTo = staffList.find((staff) => staff.id === task.assignedTo);
    task.priority = priorityList.find(
      (priority) => priority.type === task.priority,
    );
    todoData = [task, ...todoData];
    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { task } = reqBody;
    todoData = todoData.map((item) => (item.id === task.id ? task : item));
    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
