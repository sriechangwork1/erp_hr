import React, { useState } from 'react';
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

// ✅ เพิ่มรายการหน่วยงาน
const departments = [
  { dep_id: '26000100', dep_name: 'คณะศิลปศาสตร์และวิทยาศาสตร์' },
  { dep_id: '26000200', dep_name: 'คณะวิทยาการจัดการและเทคโนโลยีสารสนเทศ' },
  { dep_id: '26000300', dep_name: 'คณะครุศาสตร์' },
  { dep_id: '26000400', dep_name: 'คณะวิทยาศาสตร์' },
  { dep_id: '26000500', dep_name: 'วิทยาลัยพยาบาลบรมราชชนนี นครพนม' },
  { dep_id: '26000600', dep_name: 'วิทยาลัยการบิน การศึกษา และวิจัยนานาชาติ' },
  { dep_id: '26000700', dep_name: 'คณะเทคโนโลยีอุตสาหกรรม' },
  { dep_id: '26000800', dep_name: 'คณะเกษตรและเทคโนโลยี' },
  { dep_id: '26000900', dep_name: 'วิทยาลัยธาตุพนม' },
  { dep_id: '26001000', dep_name: 'วิทยาลัยนาหว้า' },
  { dep_id: '26001100', dep_name: 'วิทยาลัยเทคโนโลยีอุตสาหกรรมศรีสงคราม' },
  { dep_id: '26001200', dep_name: 'โรงเรียนสาธิตแห่งมหาวิทยาลัยนครพนม พนมพิทยพัฒน์' },
  { dep_id: '26001300', dep_name: 'วิทยาลัยการท่องเที่ยวและอุตสาหกรรมบริการ' },
  { dep_id: '26001400', dep_name: 'สำนักวิชาศึกษาทั่วไป' },
  { dep_id: '26001500', dep_name: 'สถาบันภาษา' },
  { dep_id: '26001600', dep_name: 'สำนักวิทยบริการ' },
  { dep_id: '26001700', dep_name: 'สำนักงานอธิการบดี' },
  { dep_id: '26001701', dep_name: 'กองพัฒนานักศึกษา' },
  { dep_id: '26001702', dep_name: 'กองบริหารงานทั่วไป' },
  { dep_id: '26001703', dep_name: 'กองนโยบายและแผน' },
  { dep_id: '26001704', dep_name: 'กองบริหารวิชาการ' },
  { dep_id: '26001705', dep_name: 'งานวารสาร' },
  { dep_id: '26001706', dep_name: 'บัณฑิตวิทยาลัย' },
  { dep_id: '26001707', dep_name: 'ตรวจสอบภายใน' },
  { dep_id: '26001708', dep_name: 'งานประกันคุณภาพการศึกษา' },
  { dep_id: '26001709', dep_name: 'สถาบันศรีโคตรบูรณ์ศึกษา' },
  { dep_id: '26001710', dep_name: 'สภาคณาจารย์' },
  { dep_id: '26001711', dep_name: 'โครงการจัดตั้งสถาบันเทคโนโลยีดิจิทัล' },
  { dep_id: '26001800', dep_name: 'คณะวิศวกรรมศาสตร์' },
  { dep_id: '26002000', dep_name: 'สถาบันวิจัยและพัฒนา' },
];

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

  return (
    <SelectBox
      defaultValue={defaultValue}
      value={selectionType}
      onChange={(event) => handleSelectionType(event.target.value as string)}
      className="select-box"
    >
      <MenuItem value="">-- ทั้งหมด --</MenuItem>
      {departments.map((dep) => (
        <MenuItem
          key={dep.dep_id}
          value={dep.dep_id}
          sx={{
            cursor: 'pointer',
            p: 2,
            fontSize: 14,
          }}
        >
          {dep.dep_id} {dep.dep_name}
        </MenuItem>
      ))}
    </SelectBox>
  );
};

export default AppSelectDep;
