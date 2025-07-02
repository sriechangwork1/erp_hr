import React from 'react';
import { blue, green, red, orange, grey, purple } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Fonts } from '@crema/constants/AppEnums';

const getProgressColor = (status: string) => {
  switch (status) {
    case 'รอดำเนินการ': // Pending
      return orange[600]; 

    case 'รอพิจารณา': // Waiting for review
      return purple[500]; 

    case 'อนุมัติ': // Approved
      return green[600];

    case 'ไม่อนุมัติ': // Not Approved
      return red[600];

    case 'ผ่านการพิจารณา': // Considered Passed
      return blue[500];

    case 'ไม่ผ่านการพิจารณา': // Considered Failed
      return red[500];

    case 'เสร็จสิ้น': // Completed
      return green[700];

    case 'จ่ายเงิน': // Paid
      return blue[700];

    case 'ยกเลิก': // Canceled
      return grey[500];

    case 'ใช้งาน': // Active
      return green[500];

    case 'ไม่ใช้งาน': // Inactive
      return grey[600];

    default:
      return grey[400]; // กรณีไม่มีในรายการ
  }
};

const AppStatus = ({ status }: { status: string }) => {
  const color = getProgressColor(status); // ใช้ตัวแปรเก็บสีเพื่อใช้ซ้ำ

  return (
    <Box
      component="span"
      sx={{
        padding: '5px 14px',
        borderRadius: 30,
        fontSize: 12,
        fontWeight: Fonts.SEMI_BOLD,
        minWidth: 85,
        textAlign: 'center',
        color: color,
        backgroundColor: `${color}33`, // เพิ่มความโปร่งใสให้ Background
      }}
    >
      {status}
    </Box>
  );
};

export default AppStatus;
