import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import IntlMessages from '@crema/helpers/IntlMessages';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import { useTodoContext } from '../../../context/TodoContextProvider';
import { StaffType } from '@crema/types/models/apps/Todo';

type Props = {
  selectedStaff: StaffType;
  handleStaffChange: (event: SelectChangeEvent<number>) => void;
};
const ChangeStaff = ({ selectedStaff, handleStaffChange }: Props) => {
  const { staffList } = useTodoContext();
  return (
    <FormControl
      variant="outlined"
      sx={{
        minWidth: 100,
        width: '100%',
      }}
    >
      <InputLabel id="selected-staff-select-outlined-label">
        <IntlMessages id="common.staff" />
      </InputLabel>
      <Select
        labelId="selected-staff-select-outlined-label"
        sx={{
          cursor: 'pointer',
          '& .MuiOutlinedInput-input': {
            paddingBottom: 2.5,
            paddingTop: 2.5,
          },
        }}
        value={selectedStaff?.id}
        label={<IntlMessages id="common.staff" />}
        onChange={handleStaffChange}
      >
        {staffList.map((staff) => {
          return (
            <MenuItem
              value={staff.id}
              key={staff.id}
              sx={{
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {staff.image ? (
                  <Avatar
                    sx={{
                      marginRight: 3,
                      height: 36,
                      width: 36,
                    }}
                    src={staff.image}
                  />
                ) : (
                  <Avatar
                    sx={{
                      marginRight: 3,
                      height: 36,
                      width: 36,
                    }}
                  >
                    {staff.name.toUpperCase()}
                  </Avatar>
                )}
                <Box component="span">{staff.name}</Box>
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ChangeStaff;
