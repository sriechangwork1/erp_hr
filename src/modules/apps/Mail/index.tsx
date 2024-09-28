'use client';
import React from 'react';
import MailsList from './MailsList';
import MailDetail from './MailDetail';
import AppsContainer from '@crema/components/AppsContainer';
import MailSidebar from './MailSideBar';
import { useIntl } from 'react-intl';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import { MailDetailViewWrapper } from './index.styled';
import MailContextProvider from '../context/MailContextProvider';

const Mail = () => {
  const params = useParams();
  const { messages } = useIntl();

  return (
    <MailContextProvider>
      <AppsContainer title={messages['mailApp.mail'] as string} sidebarContent={<MailSidebar />}>
        <MailsList />
        <MailDetailViewWrapper
          className={clsx({
            show: params?.all?.length ? Number(params.all[params.all.length - 1]) > 0 : false,
          })}
        >
          <MailDetail />
        </MailDetailViewWrapper>
      </AppsContainer>
    </MailContextProvider>
  );
};

export default Mail;
