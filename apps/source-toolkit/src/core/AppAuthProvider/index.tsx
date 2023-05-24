import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import FirebaseAuthProvider from '@crema/services/auth/FirebaseAuthProvider';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '@crema/constants/ActionTypes';

type Props = {
  children: ReactNode;
};

const AppAuthProvider = ({ children }: Props) => {
  const dispatch = useDispatch();

  const fetchStart = () => {
    dispatch({ type: FETCH_START });
  };
  const fetchError = (message: string) => {
    dispatch({ type: FETCH_ERROR, payload: message });
  };
  const fetchSuccess = () => {
    dispatch({ type: FETCH_SUCCESS });
  };
  const showMessage = (message: string) => {
    dispatch({ type: SHOW_MESSAGE, payload: message });
  };

  return (
    <FirebaseAuthProvider
      fetchStart={fetchStart}
      fetchError={fetchError}
      fetchSuccess={fetchSuccess}
      // showMessage={showMessage}
    >
      {children}
    </FirebaseAuthProvider>
  );
};

export default AppAuthProvider;
