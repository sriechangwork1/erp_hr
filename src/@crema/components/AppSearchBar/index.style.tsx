import React from 'react';
import { Box, inputBaseClasses, lighten, Theme } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

type SearchWrapperProps = {
  theme?: Theme;
  iconPosition: string;

  [x: string]: any;
};

export const SearchWrapper: React.FC<SearchWrapperProps> = ({ iconPosition, children }) => {
  return (
    <Box
      sx={[
        (theme) => ({
          borderRadius: (theme: any) => theme?.cardRadius / 4,
          display: 'block',
          cursor: 'pointer',
        }),
        iconPosition === 'right'
          ? {
              '& .searchRoot .MuiInputBase-input': {
                paddingLeft: 5,
              },
            }
          : {
              '& .searchRoot .MuiInputBase-input': {
                paddingLeft: 'calc(1em + 28px)',
              },
            },
        iconPosition === 'right'
          ? {
              '& .searchRoot .MuiInputBase-input': {
                paddingRight: 'calc(1em + 28px)',
              },
            }
          : {
              '& .searchRoot .MuiInputBase-input': {
                paddingRight: 5,
              },
            },
      ]}
    >
      {children}
    </Box>
  );
};

export const SearchInputBase = styled(InputBase)(({ theme }) => ({
  fontWeight: Fonts.MEDIUM,
  [`& .${inputBaseClasses.root}`]: {
    color: 'inherit',
    width: '100%',
  },
  [`& .${inputBaseClasses.input}`]: {
    border: '0 none',
    backgroundColor: lighten(theme.palette.background.default, 0.25),
    color: theme.palette.text.primary,
    borderRadius: 30,
    padding: theme.spacing(2, 2, 2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(6)})`,
    transition: theme.transitions.create('width'),
    width: 200,
    height: 40,
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
      width: 110,
    },
    '&:focus': {
      backgroundColor: lighten(theme.palette.background.default, 0.25),
      width: 240,
      [theme.breakpoints.down('md')]: {
        width: 162,
      },
    },
    '&:hover': {
      backgroundColor: lighten(theme.palette.background.default, 0.2),
    },
  },
}));

type SearchIconBoxProps = {
  theme?: Theme;
  align?: string;

  [x: string]: any;
  children: React.ReactNode;
};

export const SearchIconBox = styled('div')(({ theme }: SearchIconBoxProps) => ({
  position: 'relative',
  marginLeft: 0,
  '& .searchIconBox': {
    position: 'relative',
    '& $inputInput': {
      width: 220,
      borderRadius: 50,
      paddingLeft: 27,
      '&:focus': {
        width: 235,
        borderRadius: 50,
        paddingLeft: `calc(1em + ${4})`,
      },
    },
  },
  '&.hs-disableFocus': {
    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
  variants: [
    {
      props: {
        align: 'right',
      },
      style: {
        marginLeft: 'auto',
      },
    },
  ],
}));
export const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 12,
  zIndex: 1,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&.right': {
    left: 'auto',
    right: 12,
    '& + $inputRoot $inputInput': {
      paddingLeft: theme.spacing(5),
      paddingRight: `calc(1em + ${theme.spacing(7)})`,
    },
  },
}));
