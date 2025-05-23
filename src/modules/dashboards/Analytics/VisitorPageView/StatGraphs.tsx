import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { VisitorsPageViewType } from '@crema/types/models/dashboards/Analytics';

type Props = {
  data: VisitorsPageViewType[];
};
const StatGraphs = ({ data = [] }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 50, right: 0, left: -25, bottom: 0 }}>
        <XAxis dataKey="name" tickLine={false} axisLine={false} padding={{ left: 20, right: 20 }} />
        <Tooltip labelStyle={{ color: 'black' }} />
        <CartesianGrid stroke="#eee" horizontal={true} vertical={false} />
        <Line type="monotone" dataKey="Page" stroke="#0698ec" dot={false} strokeWidth={2} activeDot={{ r: 4 }} />
        <Line type="monotone" dot={false} strokeWidth={2} dataKey="Visitor" stroke="#f44d50" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StatGraphs;
