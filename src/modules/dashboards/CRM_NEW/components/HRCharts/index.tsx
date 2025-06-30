// crm/components/HRCharts/index.tsx
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PersonnelTypeChart from './PersonnelTypeChart';
import TurnoverRateChart from './TurnoverRateChart';
import LeaveTypeChart from './LeaveTypeChart';
import GradeDistributionChart from './GradeDistributionChart';

type HRChartsProps = {
  personnelByTypeData: { name: string; value: number }[];
  turnoverRatesData: { YEAR_MONTH: string; TURNOVER_RATE: number }[];
  leaveTypeData: { name: string; value: number }[];
  gradeDistributionData: { name: string; value: number }[];
};

const HRCharts: React.FC<HRChartsProps> = ({
  personnelByTypeData,
  turnoverRatesData,
  leaveTypeData,
  gradeDistributionData,
}) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
     <Grid item xs={12}>
        <PersonnelTypeChart data={personnelByTypeData} />
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <TurnoverRateChart data={turnoverRatesData} />
      </Grid>
      <Grid item xs={12} md={6}>
        <LeaveTypeChart data={leaveTypeData} />
      </Grid>
      <Grid item xs={12} md={6}>
        <GradeDistributionChart data={gradeDistributionData} />
      </Grid> */}
      {/* สามารถเพิ่มกราฟอื่นๆ ในอนาคตได้ที่นี่ */}
    </Grid>
  );
};

export default HRCharts; // **เพิ่มบรรทัดนี้เข้ามา**