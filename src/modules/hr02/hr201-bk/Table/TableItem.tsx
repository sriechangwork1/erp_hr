import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import OrderActions from './OrderActions';
import StarRateIcon from '@mui/icons-material/StarRate';
import { styled } from '@mui/material/styles';
import { CustomersDataType } from '@crema/types/models/ecommerce/EcommerceApp';


const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  '&:first-of-type': {
    paddingLeft: 20,
  },
  '&:last-of-type': {
    paddingRight: 20,
  },
}));

type TableItemProps = {
  data: CustomersDataType;
};

const TableItem: React.FC<TableItemProps> = ({ data }) => {
  return (
    <TableRow key={data.name} className="item-hover">
      <StyledTableCell component="th" scope="row">
        <Box
          sx={(theme) => ({
            color: 'primary.main',
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            display: 'inline-block',
          })}
        >
          {data.name}
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left">{data.email}</StyledTableCell>
      <StyledTableCell align="left">{data.lastItem}</StyledTableCell>
      <StyledTableCell align="left">{data.lastOrder}</StyledTableCell>
      <StyledTableCell align="left">
        <Box
          component="span"
          sx={{
            color: 'white',
            backgroundColor: '#388E3C',
            maxWidth: 55,
            mr: 2,
            px: 3,
            pt: 0.5,
            pb: 1,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 10,
            fontSize: 12,
          }}
        >
          {data.rating} <StarRateIcon style={{ fontSize: 16 }} />
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left">{data.balance}</StyledTableCell>
      <StyledTableCell align="left">{data.address}</StyledTableCell>
      <StyledTableCell align="left">{data.joinDate}</StyledTableCell>
      <StyledTableCell align="right">
        <OrderActions />
      </StyledTableCell>
    </TableRow>
  );
};

export default TableItem;
