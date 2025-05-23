import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import OrderActions from './OrderActions';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { ProductDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import { ellipsisLines } from '@crema/helpers/StringHelper';
import Image from 'next/image';

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
  data: ProductDataType;
};

const TableItem = ({ data }: TableItemProps) => {
  const router = useRouter();
  const getPaymentStatusColor = () => {
    switch (data.inStock) {
      case true: {
        return '#43C888';
      }
      case false: {
        return '#F84E4E';
      }
    }
  };

  return (
    <TableRow key={data.id} className="item-hover">
      <StyledTableCell align="left" sx={{ width: 400 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            color: 'primary.main',
          }}
          onClick={() => router.push(`/ecommerce/product_detail/${data?.id}`)}
        >
          <Image
            style={{
              objectFit: 'contain',
              marginRight: 10,
            }}
            src={data?.image?.[0]?.src || ''}
            alt="crema-logo"
            height={40}
            width={40}
          />
          {ellipsisLines(data.title)}
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left">{data.SKU}</StyledTableCell>
      <StyledTableCell align="left">{data.createdAt}</StyledTableCell>
      <StyledTableCell align="left">
        <Box
          sx={{
            color: getPaymentStatusColor(),
            backgroundColor: getPaymentStatusColor() + '44',
            padding: '3px 5px',
            borderRadius: 1,
            fontSize: 14,
            display: 'inline-block',
          }}
        >
          {data.inStock ? 'In Stock' : 'Out of Stock'}
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left">${data.mrp}</StyledTableCell>
      <TableCell align="right">
        <OrderActions id={data.id} />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
