'use client';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import { useParams } from 'next/navigation';
import type { ContactType, FolderType, LabelType } from '@crema/types/models/apps/Contact';

export type ContactContextType = {
  labelList: LabelType[];
  folderList: FolderType[];
  contactList: ContactType;
  loading: boolean;
  page: number;
  pageView: string;
};

export type ContactActionContextType = {
  setContactData: (data: ContactType) => void;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, data: number) => void;
  reCallAPI: () => void;
  setPageView: (data: string) => void;
  onChangePageView: (data: string) => void;
};

const ContextState: ContactContextType = {
  labelList: [],
  folderList: [],
  contactList: {} as ContactType,
  loading: false,
  page: 0,
  pageView: 'list',
};

const ContactContext = createContext<ContactContextType>(ContextState);
const ContactActionsContext = createContext<ContactActionContextType>({
  setContactData: (data: ContactType) => {},
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, data: number) => {},
  reCallAPI: () => {},
  setPageView: (data: string) => {},
  onChangePageView: (data: string) => {},
});

export const useContactContext = () => useContext(ContactContext);

export const useContactActionsContext = () => useContext(ContactActionsContext);

type Props = {
  children: ReactNode;
};

export const ContactContextProvider = ({ children }: Props) => {
  const params = useParams();
  const { all } = params;
  const [{ apiData: labelList }] = useGetDataApi<LabelType[]>('/contact/labels', []);

  const [{ apiData: folderList }] = useGetDataApi<FolderType[]>('/contact/folders', []);

  const [pageView, setPageView] = useState('list');

  const [page, setPage] = useState(0);

  const [{ apiData: contactList, loading }, { setQueryParams, setData: setContactData, reCallAPI }] =
    useGetDataApi<ContactType>('/contact', {} as ContactType, {}, false);

  useEffect(() => {
    setPage(0);
  }, [all]);

  useEffect(() => {
    setQueryParams({
      type: all[0],
      name: all[1],
      page: page,
    });
  }, [all, page]);

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    setPage(value);
  };

  const onChangePageView = (view: string) => {
    setPageView(view);
  };

  return (
    <ContactContext.Provider
      value={{
        labelList,
        folderList,
        contactList,
        loading,
        page,
        pageView,
      }}
    >
      <ContactActionsContext.Provider
        value={{
          setContactData,
          onPageChange,
          reCallAPI,
          setPageView,
          onChangePageView,
        }}
      >
        {children}
      </ContactActionsContext.Provider>
    </ContactContext.Provider>
  );
};
export default ContactContextProvider;
