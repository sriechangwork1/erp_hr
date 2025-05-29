'use client';
import React, { useEffect, useState } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import { useIntl } from 'react-intl';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppsPagination from '@crema/components/AppsPagination';
import Box from '@mui/material/Box';
import AppSearchBar from '@crema/components/AppSearchBar';
import AppSelectDep from '@crema/components/AppSelectDep';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import CustomerTable from './Table';
import { CustomersDataType } from '@crema/types/models/ecommerce/EcommerceApp';

type CustomerType = {
  customerCount: number;
  customers: CustomersDataType[];
};
const Hr202 = () => {
  const { messages } = useIntl();
  const [
    {
      apiData: { customers, customerCount },
    },
    { setQueryParams },
  ] = useGetDataApi<CustomerType>('/ecommerce/customers', {} as CustomerType, {}, false);

  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState('');

  const onPageChange = (event: any, value: number) => {
    setPage(value);
  };

  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  const handleDepartmentChange = (departmentId: string) => {
    console.log('Selected Department ID:', departmentId);
    setSelectedDepartment(departmentId);
    // สามารถใช้ departmentId ไป fetch ข้อมูลที่เกี่ยวข้องได้ที่นี่
  };

  useEffect(() => {
    setQueryParams({ search, page });
  }, [search, page]);

  const onSearchCustomer = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  return (
    <AppsContainer title={<IntlMessages id="sidebar.hr02.02" />} fullView>
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
          <AppSelectDep onChange={handleDepartmentChange} defaultValue={selectedDepartment} />
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'row',
              alignItems: 'center',
              ml: 'auto',
            }}
          >
            <AppsPagination rowsPerPage={10} count={customerCount} page={page} onPageChange={onPageChange} />
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

      <Box
        component="span"
        sx={{
          display: { sm: 'none', xs: 'block' },
        }}
      >
        <AppsPagination rowsPerPage={10} count={customerCount} page={page} onPageChange={onPageChange} />
      </Box>
    </AppsContainer>
  );
};

export default Hr202;
