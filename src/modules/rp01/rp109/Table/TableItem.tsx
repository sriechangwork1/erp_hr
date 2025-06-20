// rp109/table/tableitem.tsx
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { AdministrativeStaffDisplay } from '../types';
import Skeleton from '@mui/material/Skeleton';

interface TableItemProps {
  data: AdministrativeStaffDisplay;
  index: number;
  isLoading: boolean;
}

const TableItem: React.FC<TableItemProps> = ({ data, index, isLoading }) => {
  return (
    <TableRow
      key={data.id}
      sx={{ '& .tableCell': { fontSize: 13, padding: '8px 16px' } }}
      className={isLoading ? 'loading' : ''}
    >
      <TableCell component="th" scope="row" className="tableCell">
        {isLoading ? <Skeleton width={30} /> : index + 1}
      </TableCell>
      <TableCell align="left" className="tableCell">
        {isLoading ? <Skeleton width={120} /> : data.fullNameTh}
      </TableCell>
      <TableCell align="left" className="tableCell">
        {isLoading ? <Skeleton width={150} /> : data.adminPositionName}
      </TableCell>
      <TableCell align="left" className="tableCell">
        {isLoading ? <Skeleton width={150} /> : data.academicPositionName || '-'}
      </TableCell>
      <TableCell align="left" className="tableCell">
        {isLoading ? <Skeleton width={100} /> : data.staffTypeDisplay}
      </TableCell>
      <TableCell align="center" className="tableCell">
        {isLoading ? <Skeleton width={50} /> : data.gender}
      </TableCell>
      <TableCell align="center" className="tableCell">
        {isLoading ? <Skeleton width={100} /> : data.dateOfAppointment}
      </TableCell>
      <TableCell align="center" className="tableCell">
        {isLoading ? <Skeleton width={50} /> : (data.isActive ? 'Active' : 'Inactive')}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;