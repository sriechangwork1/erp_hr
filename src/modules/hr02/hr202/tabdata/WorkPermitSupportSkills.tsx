// src/components/EducationReference.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import IntlMessages from '@crema/helpers/IntlMessages';

const WorkPermitSupportSkills = () => {
  return (
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', mt: 3 }}>
      <IntlMessages id="common.staffDetails" defaultMessage="หนังสือเดินทาง" />
      {/* สามารถเพิ่มฟอร์มหรือตารางสำหรับข้อมูลการศึกษาได้ที่นี่ */}
    </Box>
  );
};

export default WorkPermitSupportSkills;