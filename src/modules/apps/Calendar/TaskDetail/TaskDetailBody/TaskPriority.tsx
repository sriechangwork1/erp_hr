import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import IntlMessages from '@crema/helpers/IntlMessages';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import { MenuItem } from '@mui/material';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { putDataApi } from '@crema/hooks/APIHooks';
import { useCalendarContext } from '../../../context/CalendarContextProvider';
import { PriorityType, TodoType } from '@crema/types/models/apps/Todo';

type Props = {
  selectedTask: TodoType;
  onUpdateSelectedTask: (data: TodoType) => void;
};

const TaskPriority = ({ selectedTask, onUpdateSelectedTask }: Props) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { priorityList } = useCalendarContext();

  const [priority, setPriority] = useState(selectedTask?.priority?.type);

  const onChangePriority = (event: SelectChangeEvent<number>) => {
    setPriority(event.target.value as number);
    const priority = priorityList.find((data) => data.type.toString() === event.target.value.toString());
    const task = selectedTask;
    task.priority = priority as PriorityType;
    putDataApi<TodoType>('/calender/detail', infoViewActionsContext, {
      task: selectedTask,
    })
      .then((data) => {
        onUpdateSelectedTask(data);
        infoViewActionsContext.showMessage('Task Updated Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <FormControl variant="outlined">
      <InputLabel id="priority-select-outlined-label">
        <IntlMessages id="common.priority" />
      </InputLabel>
      <Select
        labelId="priority-select-outlined-label"
        label={<IntlMessages id="common.priority" />}
        name="priority"
        value={priority}
        onChange={(event) => onChangePriority(event)}
        sx={{
          cursor: 'pointer',
          maxWidth: '72px',
          width: '100%',
          '& .MuiOutlinedInput-input': {
            paddingBottom: 2.5,
            paddingTop: 2.5,
          },
        }}
      >
        {priorityList.map((priority) => {
          return (
            <MenuItem
              key={priority.id}
              value={priority.type}
              sx={{
                padding: 2,
                cursor: 'pointer',
              }}
            >
              {priority.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TaskPriority;
