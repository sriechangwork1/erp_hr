import { FolderType, LabelType, PriorityType, StaffType, TodoType } from '../models/apps/Todo';

export const CREATE_NEW_TASK = 'CREATE_NEW_TASK';
export const GET_TASK_DETAIL = 'GET_TASK_DETAIL';
export const GET_TASK_LIST = 'GET_TASK_LIST';
export const GET_TODO_FOLDER_LIST = 'GET_TODO_FOLDER_LIST';
export const GET_TODO_LABEL_LIST = 'GET_TODO_LABEL_LIST';
export const GET_TODO_PRIORITY_LIST = 'GET_TODO_PRIORITY_LIST';
export const GET_TODO_STAFF_LIST = 'GET_TODO_STAFF_LIST';
export const GET_TODO_STATUS_LIST = 'GET_TODO_STATUS_LIST';
export const TOGGLE_TODO_DRAWER = 'TOGGLE_TODO_DRAWER';
export const UPDATE_TASK_DETAIL = 'UPDATE_TASK_DETAIL';
export const UPDATE_TASK_FOLDER = 'UPDATE_TASK_FOLDER';
export const UPDATE_TASK_LABEL = 'UPDATE_TASK_LABEL';
export const UPDATE_TASK_STARRED_STATUS = 'UPDATE_TASK_STARRED_STATUS';

export type CreateNewTaskActions = {
  type: typeof CREATE_NEW_TASK;
  payload: TodoType;
};

export type GetTaskDetailActions = {
  type: typeof GET_TASK_DETAIL;
  payload: TodoType;
};

export type GetTaskListActions = {
  type: typeof GET_TASK_LIST;
  payload: {
    data: TodoType[];
    count: number;
  };
};

export type GetTodoFolderListAction = {
  type: typeof GET_TODO_FOLDER_LIST;
  payload: FolderType[];
};

export type GetTodoLabelListAction = {
  type: typeof GET_TODO_LABEL_LIST;
  payload: LabelType[];
};

export type GetTodoPriorityListAction = {
  type: typeof GET_TODO_PRIORITY_LIST;
  payload: PriorityType[];
};

export type GetTodoStaffListAction = {
  type: typeof GET_TODO_STAFF_LIST;
  payload: StaffType[];
};

export type ToggleTodoDrawerActions = {
  type: typeof TOGGLE_TODO_DRAWER;
};

export type UpdateTaskDetailAction = {
  type: typeof UPDATE_TASK_DETAIL;
  payload: {
    task: TodoType;
    data: TodoType[];
  };
};

export type UpdateTodoFolderAction = {
  type: typeof UPDATE_TASK_FOLDER;
  payload: { list: TodoType[]; total: number };
};

export type UpdateTodoLabelAction = {
  type: typeof UPDATE_TASK_LABEL;
  payload: TodoType[];
};

export type UpdateTaskStaredAction = {
  type: typeof UPDATE_TASK_STARRED_STATUS;
  payload: { data: TodoType[]; folderName: string };
};

export type GetTaskListStatusAction = {
  type: typeof GET_TODO_STATUS_LIST;
  payload: TodoType;
};

export type TaskActions =
  | CreateNewTaskActions
  | GetTaskDetailActions
  | GetTaskListActions
  | GetTodoFolderListAction
  | GetTodoLabelListAction
  | GetTodoPriorityListAction
  | GetTodoStaffListAction
  | ToggleTodoDrawerActions
  | UpdateTaskDetailAction
  | UpdateTodoFolderAction
  | UpdateTodoLabelAction
  | GetTaskListStatusAction
  | UpdateTaskStaredAction;
