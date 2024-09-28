import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/components/AppTableContainer';
import { PageVisitType } from '@crema/types/models/dashboards/Analytics';
import AppScrollbar from '@crema/components/AppScrollbar';

type Props = {
  visitsData: PageVisitType[];
};
const VisitsTable = ({ visitsData = [] }: Props) => {
  const getData = (data: PageVisitType[]) => {
    return data.slice(0, 11);
  };

  return (
    <AppTableContainer sxStyle={{ maxHeight: 580 }}>
      <AppScrollbar sx={{ maxHeight: 580 }}>
        <Table stickyHeader className="table">
          <TableHead sx={{ borderBottom: '0 none' }}>
            <TableHeading />
          </TableHead>
          <TableBody sx={{ borderBottom: '0 none' }}>
            {getData(visitsData).map((data) => (
              <TableItem data={data} key={data.id} />
            ))}
          </TableBody>
        </Table>
      </AppScrollbar>
    </AppTableContainer>
  );
};

export default VisitsTable;
