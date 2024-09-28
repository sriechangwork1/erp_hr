'use client';
import React from 'react';
import AddInvoice from './AddInvoice';
import { postDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useRouter } from 'next/navigation';
import { InvoiceType, InvoiceSettingType, ClientType } from '@crema/types/models/invoice';
type ClientListProps = {
  clientsData: ClientType[];
};
type InvSettingsProps = {
  invoiceSettingsData: InvoiceSettingType;
};
type InvoiceListProps = {
  data: InvoiceType[];
};
const AddInvoicePage = () => {
  const router = useRouter();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [{ apiData: clientsList }] = useGetDataApi<ClientType[]>('/invoice/clients', [], {}, true);
  const [{ apiData: invoiceSettings }] = useGetDataApi<InvoiceSettingType>(
    '/invoice/settings',
    {} as InvoiceSettingType,
    {},
    true,
  );
  const [{ apiData: invoiceList }] = useGetDataApi<InvoiceType[]>('/invoice', [], {}, true);
  const onSave = (invoice: InvoiceType) => {
    postDataApi('/invoice', infoViewActionsContext, { invoice })
      .then(() => {
        infoViewActionsContext.showMessage('New Invoice has been created successfully!');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    router.push('/invoice/home');
  };

  return clientsList && invoiceList?.length ? (
    <AddInvoice
      clientsList={clientsList}
      totalCount={invoiceList?.length || 0}
      invoiceSettings={invoiceSettings}
      onSave={onSave}
    />
  ) : null;
};

export default AddInvoicePage;
