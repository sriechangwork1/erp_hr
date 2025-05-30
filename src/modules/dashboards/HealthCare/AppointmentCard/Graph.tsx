import React from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

type Props = {
  data: {
    month: string;
    users: number;
  }[];
  color: string;
};

const Graph = ({ data = [], color }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={70}>
      <BarChart barSize={4} data={data}>
        <Bar dataKey="users" fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;

Graph.propTypes = {
  data: PropTypes.array,
  color: PropTypes.string,
};
