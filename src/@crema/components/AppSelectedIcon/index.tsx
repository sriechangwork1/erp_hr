import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

type AppSelectedIconProps = {
  backgroundColor?: string;
  color?: string;
  isCenter?: boolean;
};

const AppSelectedIcon: React.FC<AppSelectedIconProps> = ({ backgroundColor, isCenter = true, color }) => {
  const centerStyle: SxProps<Theme> = isCenter
    ? {
        position: 'absolute',
        left: '50%',
        top: '50%',
        zIndex: 1,
        transform: 'translate(-50%, -50%)',
      }
    : {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
      };
  return (
    <Box
      sx={[
        {
          width: 20,
          height: 20,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          ...centerStyle,
          '& svg': {
            fontSize: 16,
          },
        },
        backgroundColor
          ? {
              backgroundColor: backgroundColor,
            }
          : {
              backgroundColor: 'primary.main',
            },
        color
          ? {
              color: color,
            }
          : {
              color: 'primary.contrastText',
            },
      ]}
    >
      <CheckIcon>
        <IntlMessages id="customizer.checked" />
      </CheckIcon>
    </Box>
  );
};

export default AppSelectedIcon;
