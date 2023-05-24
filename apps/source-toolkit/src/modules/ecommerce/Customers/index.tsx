import React, { useEffect, useState } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import { useIntl } from 'react-intl';
import { Hidden } from '@mui/material';
import AppsHeader from '@crema/components/AppsHeader';
import AppsContent from '@crema/components/AppsContent';
import AppsPagination from '@crema/components/AppsPagination';
import Box from '@mui/material/Box';
import AppInfoView from '@crema/components/AppInfoView';
import AppSearchBar from '@crema/components/AppSearchBar';
import { CustomerTable } from '@crema/modules/ecommerce/Customers';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { getCustomers } from '../../../toolkit/actions';

const Customers = () => {
  const { messages } = useIntl();
  const dispatch = useAppDispatch();
  const customers = useAppSelector(({ ecommerce }) => ecommerce.customers);
  const customerCount = useAppSelector(
    ({ ecommerce }) => ecommerce.customerCount
  );
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState('');

  const onPageChange = (event: any, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getCustomers(search, page));
  }, [dispatch, search, page]);

  const onSearchCustomer = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  return (
    <>
      <AppsContainer
        title={messages['sidebar.ecommerce.customers'] as string}
        fullView
      >
        <AppsHeader>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: 1,
            }}
          >
            <AppSearchBar
              iconPosition="right"
              overlap={false}
              onChange={onSearchCustomer}
              placeholder={messages['common.searchHere'] as string}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                ml: 'auto',
              }}
            >
              <Hidden smDown>
                <AppsPagination
                  rowsPerPage={10}
                  count={customerCount}
                  page={page}
                  onPageChange={onPageChange}
                />
              </Hidden>
            </Box>
          </Box>
        </AppsHeader>

        <AppsContent
          sx={{
            paddingTop: 2.5,
            paddingBottom: 2.5,
          }}
        >
          <CustomerTable customers={customers} />
        </AppsContent>

        <Hidden smUp>
          <AppsPagination
            rowsPerPage={10}
            count={customerCount}
            page={page}
            onPageChange={onPageChange}
          />
        </Hidden>
      </AppsContainer>

      <AppInfoView />
    </>
  );
};

export default Customers;
