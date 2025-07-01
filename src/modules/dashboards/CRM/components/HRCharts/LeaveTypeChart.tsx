// crm/components/HRCharts/LeaveTypeChart.tsx
import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';

type LeaveTypeChartProps = {
  data: { name: string; value: number }[];
};

const LeaveTypeChart: React.FC<LeaveTypeChartProps> = ({ data }) => {
  return (
    <AppCard
      title={
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: Fonts.PRIMARY }}>
          กราฟสถิติประเภทการลา
        </Typography>
      }
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ flexGrow: 1, width: '100%', height: '250px' }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" style={{ fontFamily: Fonts.PRIMARY }} />
              <YAxis style={{ fontFamily: Fonts.PRIMARY }} />
              <Tooltip contentStyle={{ fontFamily: Fonts.PRIMARY }} labelStyle={{ fontFamily: Fonts.PRIMARY }} />
              <Legend wrapperStyle={{ fontFamily: Fonts.PRIMARY }} />
              <Bar dataKey="value" fill="#9c27b0" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography sx={{ fontFamily: Fonts.PRIMARY }}>ไม่มีข้อมูลสำหรับกราฟนี้</Typography>
          </Box>
        )}
      </Box>
    </AppCard>
  );
};

export default LeaveTypeChart;