import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHeader from "@crema/components/TableHeader";

const TableHeading = () => {
  return (
    <TableHeader>
      <TableCell>Name</TableCell>
      <TableCell>Duration</TableCell>
      <TableCell>Spend</TableCell>
      <TableCell>Budget</TableCell>
      <TableCell>Graph</TableCell>
    </TableHeader>
  );
};

export default TableHeading;
