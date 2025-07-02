'use client';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import type { ConnectionType, FolderType, LabelType, MailType } from '@crema/types/models/apps/Mail';
import { APIDataProps } from '@crema/types/models/APIDataProps';
import { useParams, usePathname } from 'next/navigation';

export type MailContextType = {
  labelList: LabelType[];
  connectionList: ConnectionType[];
  folderList: FolderType[];
  mailList: APIDataProps<MailType[]>;
  loading: boolean;
  page: number;
  all?: string | string[];
  folder?: string;
  label?: string;
};

export type MailActionContextType = {
  setMailData: (data: APIDataProps<MailType[]>) => void;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, data: number) => void;
  reCallAPI: () => void;
};

const ContextState: MailContextType = {
  labelList: [],
  folderList: [],
  connectionList: [],
  mailList: {} as APIDataProps<MailType[]>,
  loading: false,
  page: 0,
  all: undefined,
  folder: undefined,
  label: undefined,
};

const MailContext = createContext<MailContextType>(ContextState);
const MailActionsContext = createContext<MailActionContextType>({
  setMailData: (data: APIDataProps<MailType[]>) => {},
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, data: number) => {},
  reCallAPI: () => {},
});

export const useMailContext = () => useContext(MailContext);

export const useMailActionsContext = () => useContext(MailActionsContext);

type Props = {
  children: ReactNode;
};
export const MailContextProvider = ({ children }: Props) => {
  const params = useParams();
  const pathname = usePathname();
  const { all } = params;
  let folder: any;

  let label: any;
  if (all.length === 2 && !+all[1]) {
    label = all[1];
  } else if (all.length === 1) {
    folder = all[0];
  }
  const [{ apiData: labelList }] = useGetDataApi<LabelType[]>('/mail/labels');
  const [{ apiData: connectionList }] = useGetDataApi<ConnectionType[]>('mail/connection');
  const [{ apiData: folderList }] = useGetDataApi<any>('mail/folders');
  const [page, setPage] = useState(0);

  const [{ apiData: mailList, loading }, { setQueryParams, setData: setMailData, reCallAPI }] = useGetDataApi<
    APIDataProps<MailType[]>
  >(
    'mail',
    undefined,
    {
      type: folder ? 'folder' : 'label',
      name: folder || label,
      page: page,
    },
    false,
  );

  useEffect(() => {
    setPage(0);
  }, [pathname]);

  useEffect(() => {
    setQueryParams({
      type: folder ? 'folder' : 'label',
      name: folder || label,
      page,
    });
  }, [page, pathname]);

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    setPage(value);
  };

  return (
    <MailContext.Provider
      value={{
        all,
        folder,
        label,
        labelList,
        connectionList,
        folderList,
        mailList,
        loading,
        page,
      }}
    >
      <MailActionsContext.Provider
        value={{
          setMailData,
          onPageChange,
          reCallAPI,
        }}
      >
        {children}
      </MailActionsContext.Provider>
    </MailContext.Provider>
  );
};
export default MailContextProvider;
