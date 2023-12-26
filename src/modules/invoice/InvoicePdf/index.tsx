'use client';
import React from 'react';
import InvoicePdf from './InvoicePdf';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import { isEmptyObject } from '@crema/helpers/ApiHelper';
import { useParams, useRouter } from 'next/navigation';
import {
  InvoiceType,
  InvoiceSettingType,
  ClientType,
} from '@crema/types/models/invoice';

const InvoicePdfPage = () => {
  const params = useParams();
  const { all } = params;
  const [{ apiData: invoiceSettings }] = useGetDataApi<InvoiceSettingType>(
    '/invoice/settings',
    {} as InvoiceSettingType,
    {},
    true,
  );
  const [{ apiData: clientsList }] = useGetDataApi<ClientType[]>(
    '/invoice/clients',
    [],
    {},
    true,
  );
  const [{ apiData: selectedInv }] = useGetDataApi<InvoiceType>(
    '/invoice/detail',
    {} as InvoiceType,
    { id: all[0] || 1 },
    true,
  );
  return clientsList?.length > 0 &&
    !isEmptyObject(invoiceSettings) &&
    !isEmptyObject(selectedInv) ? (
    <InvoicePdf
      selectedInv={selectedInv}
      clientsList={clientsList}
      invoiceSettings={invoiceSettings}
    />
  ) : null;
};

export default InvoicePdfPage;
