import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Box from '@mui/material/Box';
import { ProgressGraphDaumType } from '@crema/types/models/dashboards/CRM';

type Props = {
  progressGraphData: ProgressGraphDaumType[];
};
const GoalProgressGraph = ({ progressGraphData = [] }: Props) => {
  return (
    <Box
      sx={{
        position: 'relative',
        '& .goalChart': {
          height: '320px !important',
        },
      }}
    >
      <ResponsiveContainer height={340}>
        <BarChart barGap={5} barSize={8} data={progressGraphData} margin={{ top: 50 }}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip labelStyle={{ color: 'black' }} />
          <Bar dataKey="progress" stackId="a" fill="#3182CE" />
          <Bar dataKey="actual" stackId="a" fill="#E53E3E" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default GoalProgressGraph;
