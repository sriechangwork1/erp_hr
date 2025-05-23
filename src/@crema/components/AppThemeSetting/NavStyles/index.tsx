import React from 'react';
import Box from '@mui/material/Box';
import { CustomizerItemWrapper } from '../index.style';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useLayoutActionsContext, useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import AppSelectedIcon from '../../AppSelectedIcon';
import { navStyles, NavStyleType } from '@crema/fakedb/navigationStyle';
import Image from 'next/image';

const NavStyles = () => {
  const { updateNavStyle } = useLayoutActionsContext();
  const { navStyle } = useLayoutContext();

  const onNavStyleChange = (navStyle: string) => {
    updateNavStyle(navStyle);
  };

  return (
    <CustomizerItemWrapper
      sx={{
        pb: 1,
      }}
    >
      <Box component="h4" sx={{ mb: 3 }}>
        <IntlMessages id="customizer.navigationStyles" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          mx: -1.25,
        }}
      >
        {navStyles.map((navLayout: NavStyleType) => {
          return (
            <Box
              sx={{
                px: 1.25,
                mb: 1.25,
              }}
              key={navLayout.id}
            >
              <Box
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => onNavStyleChange(navLayout.alias)}
              >
                <Image src={`${navLayout.image}`} alt="nav" width={65} height={57} />
                {navStyle === navLayout.alias ? <AppSelectedIcon /> : null}
              </Box>
            </Box>
          );
        })}
      </Box>
    </CustomizerItemWrapper>
  );
};

export default NavStyles;
