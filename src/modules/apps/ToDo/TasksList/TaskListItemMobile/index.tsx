import React from 'react';
import ListItem from '@mui/material/ListItem';
import { useParams, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import Priority from './Priority';
import AppsStarredIcon from '@crema/components/AppsStarredIcon';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { TodoType } from '@crema/types/models/apps/Todo';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: '8px 20px 4px 20px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'flex-start',
  cursor: 'pointer',
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('sm')]: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  '&.checked': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    boxShadow: `0 3px 5px 0 ${alpha(theme.palette.common.black, 0.08)}`,
  },
  '& .labelIcon': {
    transform: 'translateX(60px)',
    transition: 'all 0.5s ease',
    display: 'flex',
    alignItems: 'center',
  },
}));

const UserInfoWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  width: '80%',
  [theme.breakpoints.up('sm')]: {
    width: '75%',
  },
}));
const TaskActionView = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '20%',
  paddingLeft: 12,
  [theme.breakpoints.up('sm')]: {
    width: '25%',
  },
}));

type Props = {
  task: TodoType;
  checkedTasks: number[];
  onChangeStarred: (checked: boolean, task: TodoType) => void;
};

const TaskListItemMobile = ({ task, checkedTasks = [], onChangeStarred }: Props) => {
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
      <UserInfoWrapper>
        <Box
          sx={{
            mr: 3.5,
            mt: 1,
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
            }}
            src={task.assignedTo.image}
            alt={task.assignedTo.name}
          />
        </Box>

        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                mb: 1.5,
                mr: 1.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              component="p"
            >
              {task.title}
            </Box>

            <Priority priority={task.priority} />
          </Box>

          <Typography
            sx={{
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {task.content}
          </Typography>
        </Box>
      </UserInfoWrapper>
      <TaskActionView>
        <Box
          component="span"
          sx={{
            color: 'text.secondary',
            fontSize: 12,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            transition: 'all 0.5s ease',
          }}
        >
          {dayjs(task.startDate).format('HH:mm A')}
        </Box>
        <Box
          component="span"
          onClick={(event) => event.stopPropagation()}
          sx={{
            mt: 'auto',
          }}
        >
          <AppsStarredIcon item={task} onChange={onChangeStarred} />
        </Box>
      </TaskActionView>
    </StyledListItem>
  );
};

export default TaskListItemMobile;
