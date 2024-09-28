import React from 'react';
import { Checkbox } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import Labels from './Labels';
import Priority from './Priority';
import AppsStarredIcon from '@crema/components/AppsStarredIcon';
import Avatar from '@mui/material/Avatar';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ActionWrapper, StyledListItem, TaskInfoWrapper } from './index.style';
import { TodoType } from '@crema/types/models/apps/Todo';

type Props = {
  task: TodoType;
  onChangeCheckedTasks: (event: any, id: number) => void;
  checkedTasks: number[];
  onChangeStarred: (checked: boolean, task: TodoType) => void;
  onDeleteTask: (task: TodoType) => void;
};

const TaskListItem = ({ task, onChangeCheckedTasks, checkedTasks = [], onChangeStarred, onDeleteTask }: Props) => {
  const router = useRouter();
  const params = useParams();
  const { all } = params;

  let folder: string;
  let label: string;
  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all[0];
  }
  const onViewTaskDetail = (task: TodoType) => {
    if (folder) router.push(`/apps/todo/${folder}/${task.id}`);
    if (label) router.push(`/apps/todo/label/${label}/${task.id}`);
  };

  return (
    <StyledListItem
      dense
      key={task.id}
      className={clsx('item-hover', {
        checked: checkedTasks.includes(task.id),
      })}
      onClick={() => onViewTaskDetail(task)}
    >
      <TaskInfoWrapper>
        <span onClick={(event) => event.stopPropagation()}>
          <Checkbox
            sx={{
              color: 'text.disabled',
            }}
            checked={checkedTasks.includes(task.id)}
            onChange={(event) => onChangeCheckedTasks(event, task.id)}
            color="primary"
          />
        </span>

        <Box
          component="span"
          onClick={(event) => event.stopPropagation()}
          sx={{
            mr: 2.5,
          }}
        >
          <AppsStarredIcon item={task} onChange={onChangeStarred} />
        </Box>
        <Box
          sx={{
            mr: 3.5,
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
            }}
            src={task?.assignedTo?.image}
            alt={task?.assignedTo?.name}
          />
        </Box>

        <Box
          component="p"
          sx={{
            mr: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {task.title}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Priority priority={task.priority} />
        </Box>
      </TaskInfoWrapper>
      <ActionWrapper>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Labels labels={task.label} />
        </Box>

        <Box
          className="task-list-schedule"
          component="span"
          sx={{
            ml: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            transition: 'all 0.5s ease',
            transform: 'translateX(60px)',
          }}
        >
          <IntlMessages id="todo.scheduleFor" /> {task.startDate}
        </Box>
        <Box className="labelAction">
          <LabelOutlinedIcon onClick={(e) => e.stopPropagation()} />
          <DeleteOutlinedIcon
            onClick={(e) => {
              onDeleteTask(task);
              e.stopPropagation();
            }}
          />
        </Box>
      </ActionWrapper>
    </StyledListItem>
  );
};

export default TaskListItem;
