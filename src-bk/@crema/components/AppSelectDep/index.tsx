import React, { useEffect,useState } from 'react';
import axios from 'axios'

import { Box, inputBaseClasses, lighten, Theme } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material';

const SelectBox = styled(Select)(({ theme }) => ({
  backgroundColor: lighten(theme.palette.background.default, 0.25),
  color: theme.palette.text.primary,
  marginLeft: 8,
  cursor: 'pointer',
  fontSize: 14,
  borderRadius: 30,
  padding: theme.spacing(2, 2, 2, 0),
  paddingLeft: `calc(1em + ${theme.spacing(6)})`,
  transition: theme.transitions.create('width'),
  width: 400,
  height: 40,
  '& .MuiSelect-select': {
    paddingLeft: 3,
    paddingTop: 2,
    paddingBottom: 3,
    color: 'text.secondary',
  },
  '& .MuiSelect-icon': {
    color: 'text.secondary',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
    },
  },
  '&.Mui-focused': {
    backgroundColor: alpha(theme.palette.common.black, 0.03),
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
    },
  },
}));

type AppSelectProps = {
  onChange: (e: any) => void;
  defaultValue?: string;
};

const AppSelectDep: React.FC<AppSelectProps> = ({ onChange, defaultValue = '' }) => {
  const [selectionType, setSelectionType] = useState<string>(defaultValue);

  const handleSelectionType = (value: string) => {
    setSelectionType(value);
    onChange(value);
  };
  
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/service/public/prefixname') // 👈 ไปที่ http://localhost:4000/user/profile ผ่าน SSR proxy
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error('API Error:', err);
      })
  }, [])

  return (
    <SelectBox
      defaultValue={defaultValue}
      value={selectionType}
      onChange={(event) => handleSelectionType(event.target.value as string)}
      className="select-box"
    >
      <MenuItem value="">-- ทั้งหมด --</MenuItem>
      {data.map((dep) => (
        <MenuItem
          key={dep.id}
          value={dep.id}
          sx={{
            cursor: 'pointer',
            p: 2,
            fontSize: 14,
          }}
        >
          {dep.id} {dep.prefixname_name_th}
        </MenuItem>
      ))}
    </SelectBox>
  );
};

export default AppSelectDep;
