import React from 'react';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';

import { useSidebarActionsContext, useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import AppSelectedIcon from '../../../AppSelectedIcon';
import { menuStyles, MenuStyleType } from '@crema/fakedb/navigationStyle';
import Image from 'next/image';

const NavMenuStyle = () => {
  const { menuStyle } = useSidebarContext();

  const { updateMenuStyle } = useSidebarActionsContext();
  const onMenuStyleChange = (menuStyle: string) => {
    updateMenuStyle(menuStyle);
  };

  return (
    <>
      <Box component="h4" sx={{ mb: 3 }}>
        <IntlMessages id="customizer.sidebarMenuStyle" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '-10px',
          marginRight: '-10px',
        }}
      >
        {menuStyles.map((menu: MenuStyleType) => {
          return (
            <Box
              sx={{
                paddingLeft: 2.5,
                paddingRight: 2.5,
                marginBottom: 5,
              }}
              key={menu.id}
            >
              <Box
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => onMenuStyleChange(menu.alias)}
              >
                <Image src={`${menu.image}`} alt="nav" width={62} height={86} />
                {menuStyle === menu.alias ? <AppSelectedIcon /> : null}
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default NavMenuStyle;
