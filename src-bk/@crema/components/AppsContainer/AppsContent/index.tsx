import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import SimpleBarReact from 'simplebar-react';

type AppsContentContainerProps = {
  children: ReactNode;
  isDetailView?: boolean;
  fullView?: boolean;

  [x: string]: any;
};

const AppsContentContainer = styled(SimpleBarReact)(() => {
  return {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'column',
    '& .simplebar-content': {
      height: '100%',
    },
  };
});

type AppsContentProps = {
  children: ReactNode;
  isDetailView?: boolean;
  fullView?: boolean;

  [x: string]: any;
};

const AppsContent = ({ isDetailView = false, fullView, children, ...props }: AppsContentProps) => {
  return (
    <AppsContentContainer
      {...props}
      sx={[
        isDetailView
          ? {
              height: {
                xs: {
                  xs: 60,
                },
              },
            }
          : {
              height: {
                xs: {
                  xs: 129,
                },
              },
            },
        fullView
          ? {
              height: {
                sm: {
                  sm: 0,
                },
              },
            }
          : {
              height: {
                sm: {
                  sm: 60,
                },
              },
            },
      ]}
    >
      {children}
    </AppsContentContainer>
  );
};

export default AppsContent;
