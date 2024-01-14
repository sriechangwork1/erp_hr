'use client';
import React from 'react';
import BoardDetail from './BoardDetail';
import BoardList from './BoardList';
import { useParams, useRouter } from 'next/navigation';
import ScrumContextProvider from '../context/ScrumContextProvider';

const ScrumBoard = () => {
  const params = useParams();
  const { id } = params;

  const onGetMainComponent = () => {
    if (id) {
      return <BoardDetail />;
    } else {
      return <BoardList />;
    }
  };

  return <ScrumContextProvider>{onGetMainComponent()}</ScrumContextProvider>;
};

export default ScrumBoard;
