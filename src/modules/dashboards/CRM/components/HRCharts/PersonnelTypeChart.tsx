// crm/components/HRCharts/PersonnelTypeChart.tsx
import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';

type PersonnelTypeChartProps = {
  data: { name: string; value: number }[];
};

    
const PersonnelTypeChart: React.FC<PersonnelTypeChartProps> = ({ data }) => {
 
 
  return (
    <AppCard
      title={
        <Typography variant="h6" sx={{ fontWeight: 'bold',  }}>
          กราฟแสดงสัดส่วนบุคลากรตามประเภท
        </Typography>
      }
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
     <Box sx={{ flexGrow: 1, width: '100%', height: '250px' }}>
         {data.length > 0 ? (
         <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" style={{  }} />
              <YAxis style={{  }} />
              <Tooltip contentStyle={{  }} labelStyle={{  }} />
              <Legend wrapperStyle={{  }} />
              <Bar dataKey="value" fill="#607d8b" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography sx={{  }}>ไม่มีข้อมูลสำหรับกราฟนี้</Typography>
          </Box>
        )}
      </Box> 
    </AppCard>
  );
};

export default PersonnelTypeChart;

