import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/components/AppTableContainer';
import { TicketSupportDaumType } from '@crema/types/models/dashboards/CRM';
import AppScrollbar from '@crema/components/AppScrollbar';

type Props = {
  ticketSupportData: TicketSupportDaumType[];
};
const TicketSupportTable = ({ ticketSupportData = [] }: Props) => {
  return (
    <AppTableContainer sxStyle={{ maxHeight: 380 }}>
      <AppScrollbar sx={{ maxHeight: 380 }}>
        <Table>
          <TableHead
            sx={{
              borderBottom: '0 none',
            }}
          >
            <TableHeading />
          </TableHead>
          <TableBody
            sx={{
              borderBottom: '0 none',
            }}
          >
            {ticketSupportData.map((row, index) => (
              <TableItem key={row.name + index} row={row} />
            ))}
          </TableBody>
        </Table>
      </AppScrollbar>
    </AppTableContainer>
  );
};

export default TicketSupportTable;
