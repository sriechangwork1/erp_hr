import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AppMenu from '@crema/components/AppMenu';
import AppStatus from '@crema/components/AppStatus';

const TableCellWrapper = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  whiteSpace: 'nowrap',
  '&:first-of-type': {
    paddingLeft: 20,
  },
  '&:last-of-type': {
    paddingRight: 20,
  },
}));

type JobPositionType = {
  id: number;
  jobCode: string;
  jobTitle: string;
  jobDescription: string;
  lastUpdated: string;
  recordedBy: string;
  status: string;
};

type Props = {
  data: JobPositionType;
};

const TableItem = ({ data }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // หน่วง 0.5 วินาที
    return () => clearTimeout(timer); // เคลียร์ timeout ถ้าคอมโพเนนต์ถูก unmount
  }, []);

  return (
    <TableRow key={data.id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.jobCode}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.jobTitle}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={200} /> : data.jobDescription}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.lastUpdated}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.recordedBy}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={90} height={30} /> : <AppStatus status={data.status} />}
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton variant="circular" width={30} height={30} /> : <AppMenu />}
      </TableCellWrapper>
    </TableRow>
  );
};

export default TableItem;
