import React from 'react';
import { alpha, Box, Stack } from '@mui/material';
import AppSearchBar from '@crema/components/AppSearchBar';
import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import AppsPagination from '@crema/components/AppsPagination';
import { ProductDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import { VIEW_TYPE } from '..';

const IconBtn = styled(IconButton)(({ theme }) => {
  return {
    color: theme.palette.text.disabled,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    padding: 8,
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
    },
    '&.active': {
      color: theme.palette.primary.main,
    },
  };
});

type ProductHeaderProps = {
  onSearch: (e: string) => void;
  onPageChange: (event: any, value: number) => void;
  viewType: string;
  list: ProductDataType[];
  totalProducts: number;
  page: number;
  setViewType: (data: string) => void;
};

const ProductHeader: React.FC<ProductHeaderProps> = ({
  onSearch,
  viewType,
  list,
  page,
  totalProducts,
  onPageChange,
  setViewType,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Box sx={{ mr: 3 }}>
        <AppSearchBar
          placeholder="Search here"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onSearch(e.target.value)}
        />
      </Box>

      <Stack
        spacing={2}
        direction="row"
        sx={{
          display: 'flex',
          alignItems: 'center',
          ml: 'auto',
        }}
      >
        <IconBtn
          onClick={() => setViewType(VIEW_TYPE.LIST)}
          className={clsx({
            active: viewType === VIEW_TYPE.LIST,
          })}
        >
          <ListIcon />
        </IconBtn>
        <IconBtn
          onClick={() => setViewType(VIEW_TYPE.GRID)}
          className={clsx({
            active: viewType === VIEW_TYPE.GRID,
          })}
        >
          <AppsIcon />
        </IconBtn>
        {list?.length > 0 ? (
          <Box
            component="span"
            sx={{
              ml: { sm: 'auto' },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <AppsPagination
              rowsPerPage={10}
              count={totalProducts}
              page={page}
              onPageChange={(e: any, page: number) => onPageChange(e, page)}
            />
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};

export default ProductHeader;
