import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import PropTypes from 'prop-types';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';

const StatGraphs = ({ data = [] }) => {
  const { theme } = useThemeContext();

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 25, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.7} />
            <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" tickLine={false} axisLine={false} padding={{ left: 20, right: 20 }} />
        <Tooltip labelStyle={{ color: 'black' }} />
        <CartesianGrid strokeDasharray="2 10" horizontal={false} vertical={false} />
        <Area
          type="monotone"
          dataKey="number"
          stroke={theme.palette.secondary.main}
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StatGraphs;

StatGraphs.propTypes = {
  data: PropTypes.array,
};
