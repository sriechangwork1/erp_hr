// crm/components/HRCharts/TurnoverRateChart.tsx
import React from 'react';
import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';

type TurnoverRateChartProps = {
  data: { YEAR_MONTH: string; TURNOVER_RATE: number }[];
};

const TurnoverRateChart: React.FC<TurnoverRateChartProps> = ({ data }) => {
  return (
    <AppCard
      title={
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: Fonts.PRIMARY }}>
          กราฟอัตราการลาออกรายเดือน
        </Typography>
      }
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ flexGrow: 1, width: '100%', height: '250px' }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="YEAR_MONTH" style={{ fontFamily: Fonts.PRIMARY }} />
              <YAxis style={{ fontFamily: Fonts.PRIMARY }} />
              <Tooltip contentStyle={{ fontFamily: Fonts.PRIMARY }} labelStyle={{ fontFamily: Fonts.PRIMARY }} />
              <Legend wrapperStyle={{ fontFamily: Fonts.PRIMARY }} />
              <Line type="monotone" dataKey="TURNOVER_RATE" stroke="#f44336" activeDot={{ r: 8 }} />
            </LineChart>
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

export default TurnoverRateChart;