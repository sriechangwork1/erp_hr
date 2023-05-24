import React, { useEffect, useState } from 'react';
import InvContentHeader from './InvContentHeader';
import AppsHeader from '@crema/components/AppsHeader';
import AppsContent from '@crema/components/AppsContent';
import { putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { InvoiceTable } from '@crema/modules/invoice';
import { useRouter } from 'next/router';
import { useInfoViewActionsContext } from '@crema/context/InfoViewContextProvider';
import { isEmptyObject } from '@crema/helpers';
import AppLoader from '@crema/components/AppLoader';
import { InvoiceType } from '@crema/models/invoice';

const InvoiceList = () => {
  const { asPath, query } = useRouter();
  const { all } = query;
  const infoViewActionsContext = useInfoViewActionsContext();

  let folder = '';

  if (all && all.length === 1) {
    folder = all[0];
  }

  const [{ apiData: invoiceList, loading }, { setQueryParams, reCallAPI }] =
    useGetDataApi<InvoiceType[]>(
      '/api/invoice/list',
      [],
      { folder: folder || 'all' },
      true
    );

  const [page, setPage] = useState(0);

  const onPageChange = (event: any, value: number) => {
    setPage(value);
  };
  const [filterText, onSetFilterText] = useState('');

  const [checkedInvs, setCheckedInvs] = useState<number[]>([]);

  useEffect(() => {
    setQueryParams({
      folder: folder,
      page: page,
    });
  }, [page, folder, asPath]);

  const onChangeStatus = (invoice: InvoiceType, status: number) => {
    invoice.folderValue = status;

    putDataApi('/api/invoice/list/update', infoViewActionsContext, { invoice })
      .then(() => {
        reCallAPI();
        infoViewActionsContext.showMessage(
          'Invoice status udpated successfully!'
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };
  return !isEmptyObject(invoiceList) ? (
    <>
      <AppsHeader>
        <InvContentHeader
          page={page}
          invoiceList={invoiceList || []}
          checkedInvs={checkedInvs}
          setCheckedInvs={setCheckedInvs}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          onPageChange={onPageChange}
        />
      </AppsHeader>
      <AppsContent>
        <InvoiceTable
          invoiceData={invoiceList || []}
          loading={loading}
          onChangeStatus={onChangeStatus}
        />
      </AppsContent>
    </>
  ) : (
    <AppLoader />
  );
};

export default InvoiceList;
