// src/pages/hr908/table/index.tsx
'use client'; // <-- สำคัญมาก! ต้องมีบรรทัดนี้

import React, { useState } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
// Import Component ย่อยที่ถูกแยกออกมา
import PositionTable from './TableItem';
import { PositionSummary } from '../index'; // Import interface จากไฟล์หลัก

// =========================================================
// 1. กำหนด Interface สำหรับ Props ที่จะรับจากไฟล์หลัก
// =========================================================
interface HR915PositionListsComponentProps {
  academicPositionsSummary: PositionSummary | null;
  supportPositionsSummary: PositionSummary | null;
  error: string | null;
}

// =========================================================
// 2. ลำดับการแสดงผลของตำแหน่ง (เหมือนเดิม, แต่ย้ายมาไว้ที่นี่)
// =========================================================
const ACADEMIC_POSITION_ORDER = ['ศาสตราจารย์', 'รองศาสตราจารย์', 'ผู้ช่วยศาสตราจารย์', 'อาจารย์', 'อาจารย์พิเศษ/พนักงานสอน', 'ข้าราชการสายวิชาการ', 'พนักงานมหาวิทยาลัยสายวิชาการ', 'Other Academic'];
const SUPPORT_POSITION_ORDER = ['ข้าราชการสายสนับสนุน', 'พนักงานมหาวิทยาลัยสายสนับสนุน', 'นักวิชาการ', 'เจ้าหน้าที่บริหารงานทั่วไป', 'บุคลากร', 'ลูกจ้างประจำ', 'ลูกจ้างชั่วคราว', 'พนักงานราชการ', 'เจ้าหน้าที่ห้องปฏิบัติการ', 'Other Support'];


// =========================================================
// 3. Client Component หลัก
// =========================================================
const HR915PositionListsComponent: React.FC<HR915PositionListsComponentProps> = ({ academicPositionsSummary, supportPositionsSummary, error }) => {
  const { messages } = useIntl();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // สร้างฟังก์ชันสำหรับรับข้อความ Error จาก ServerSideProps
  const renderError = (errorMessage: string | null) => {
    if (errorMessage) {
      return <Alert severity="error" sx={{ m: 2 }}>{messages['common.errorFetchingData'] as string}: {errorMessage}</Alert>;
    }
    return null;
  };

  return (
    <AppCard
      title={<IntlMessages id="sidebar.hr.hr915" />}
      sxStyle={{ width: '100%' }}
    >
      {renderError(error)} {/* แสดง Error หากมี */}

      <Box sx={{ width: '100%', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="position type tabs">
          <Tab label={messages['report.academicPositionsList'] as string} />
          <Tab label={messages['report.supportPositionsList'] as string} />
        </Tabs>
      </Box>
      {tabValue === 0 && (
        <Box sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom>
            {messages['report.academicPositionsOverall'] as string}
          </Typography>
          {/* เรียกใช้ Component ย่อยสำหรับแสดงตาราง */}
          <PositionTable 
            summary={academicPositionsSummary} 
            type='academic' 
            orderedPositions={ACADEMIC_POSITION_ORDER} 
            messages={messages} // ส่ง messages ลงไปด้วย
          />
        </Box>
      )}
      {tabValue === 1 && (
        <Box sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom>
            {messages['report.supportPositionsOverall'] as string}
          </Typography>
          {/* เรียกใช้ Component ย่อยสำหรับแสดงตาราง */}
          <PositionTable 
            summary={supportPositionsSummary} 
            type='support' 
            orderedPositions={SUPPORT_POSITION_ORDER}
            messages={messages} // ส่ง messages ลงไปด้วย
          />
        </Box>
      )}
    </AppCard>
  );
};

export default HR915PositionListsComponent;