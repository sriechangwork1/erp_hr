import React, { useState } from 'react';
import TaskContentHeader from './TaskContentHeader';
import AddNewTask from '../AddNewTask';
import { Box } from '@mui/material';
import AppsPagination from '@crema/components/AppsPagination';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppsFooter from '@crema/components/AppsContainer/AppsFooter';
import ListEmptyResult from '@crema/components/AppList/ListEmptyResult';
import TodoListSkeleton from '@crema/components/AppSkeleton/TodoListSkeleton';
import AppList from '@crema/components/AppList';
import { putDataApi } from '@crema/hooks/APIHooks';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import TaskListItem from './TaskListItem';
import TaskListItemMobile from './TaskListItemMobile';
import { useTodoActionsContext, useTodoContext } from '../../context/TodoContextProvider';
import { TodoDataType, TodoType } from '@crema/types/models/apps/Todo';
import { loadWebpackHook } from 'next/dist/server/config-utils';

const TasksList = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { taskLists, loading, page } = useTodoContext();

  const { setTodoData, onPageChange } = useTodoActionsContext();

  const [filterText, onSetFilterText] = useState<string>('');

  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
  const [isAddTaskOpen, setAddTaskOpen] = useState<boolean>(false);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const onChangeCheckedTasks = (event: any, id: number) => {
    if (event.target.checked) {
      setCheckedTasks(checkedTasks.concat(id));
    } else {
      setCheckedTasks(checkedTasks.filter((taskId) => taskId !== id));
    }
  };

  const onChangeStarred = (checked: boolean, task: TodoType) => {
    task.isStarred = checked;
    putDataApi<TodoType>('/todo/detail', infoViewActionsContext, {
      task,
    })
      .then((data) => {
        onUpdateSelectedTask(data);
        infoViewActionsContext.showMessage(
          data?.isStarred ? 'Todo Marked as Starred Successfully' : 'Todo Marked as Unstarred Successfully',
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onGetFilteredItems = () => {
    if (filterText === '') {
      return taskLists?.data;
    } else {
      return taskLists?.data.filter((task) => task.title.toUpperCase().includes(filterText.toUpperCase()));
    }
  };

  const onUpdateSelectedTask = (task: TodoType) => {
    setTodoData({
      data: taskLists?.data.map((item) => {
        if (item.id === task?.id) {
          return task;
        }
        return item;
      }),
      count: taskLists?.count,
    });
  };

  const onUpdateTasks = (tasks: TodoType[]) => {
    setTodoData({
      data: taskLists?.data.map((item) => {
        const taskItem = tasks.find((task) => task.id === item.id);
        if (taskItem) {
          return taskItem;
        }
        return item;
      }),
      count: taskLists?.count,
    });
  };

  const onDeleteTask = (task: TodoType) => {
    task.folderValue = 126;
    setTodoData({
      data: taskLists?.data.filter((item) => item.id !== task.id),
      count: taskLists.count! - 1,
    });
  };

  const list = onGetFilteredItems();
  return (
    <>
      <AppsHeader>
        <TaskContentHeader
          onUpdateTasks={onUpdateTasks}
          checkedTasks={checkedTasks}
          setCheckedTasks={setCheckedTasks}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
        />
      </AppsHeader>
      <AppsContent>
        <>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
            <AppList
              data={list}
              renderRow={(task) => {
                return (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    onChangeCheckedTasks={onChangeCheckedTasks}
                    checkedTasks={checkedTasks}
                    onChangeStarred={onChangeStarred}
                    onDeleteTask={onDeleteTask}
                  />
                );
              }}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Add Task"
                  onClick={onOpenAddTask}
                  placeholder={<TodoListSkeleton />}
                />
              }
            />
          </Box>

          <Box component="span" sx={{ display: { sm: 'none', xs: 'block' } }}>
            <AppList
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
              data={list}
              renderRow={(task) => (
                <TaskListItemMobile
                  key={task.id}
                  task={task}
                  checkedTasks={checkedTasks}
                  onChangeStarred={onChangeStarred}
                />
              )}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Add Task"
                  onClick={onOpenAddTask}
                  placeholder={<TodoListSkeleton />}
                />
              }
            />
          </Box>
        </>
      </AppsContent>

      <Box component="span" sx={{ display: { sm: 'none', xs: 'block' } }}>
        {taskLists?.data?.length > 0 ? (
          <AppsFooter>
            <AppsPagination count={taskLists?.count as number} page={page} onPageChange={onPageChange} />
          </AppsFooter>
        ) : null}
      </Box>

      {isAddTaskOpen ? <AddNewTask isAddTaskOpen={isAddTaskOpen} onCloseAddTask={onCloseAddTask} /> : null}
    </>
  );
};

export default TasksList;
