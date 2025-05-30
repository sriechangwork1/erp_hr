import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import { orange } from '@mui/material/colors';
import IntlMessages from '@crema/helpers/IntlMessages';
import { LayoutType } from '@crema/constants/AppEnums';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import AppScrollbar from '../AppScrollbar';
import ThemeColors from './ThemeColors';
import ThemeFooter from './ThemeFooter';
import ThemeModes from './ThemeModes';
import ThemeDirection from './ThemeDirection';
import SidebarSettings from './SidebarSettings';
import NavStyles from './NavStyles';
import LayoutTypes from './LayoutTypes';
import ThemeHeader from './ThemeHeader';

const AppThemeSetting = () => {
  const [isSettingOpen, setSettingOpen] = useState(false);
  const [isColorSettingOpen, setColorSettingOpen] = useState(false);
  const { layoutType } = useLayoutContext();
  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: { xs: 85, xl: 125 },
        zIndex: 1110,
      }}
      className="customizerOption"
    >
      <Box
        sx={{
          borderRadius: '30px 0 0 30px',
          mb: 1,
          backgroundColor: orange[500],
          '&:hover': {
            backgroundColor: orange[700],
          },
          '& button': {
            borderRadius: '30px 0 0 30px',
            '&:focus': {
              borderRadius: '30px 0 0 30px',
            },
          },
        }}
      >
        <IconButton onClick={() => setSettingOpen(!isSettingOpen)}>
          <SettingsOutlinedIcon
            sx={{
              animation: 'rotation 2s infinite linear',
              color: 'white',
            }}
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          borderRadius: '30px 0 0 30px',
          backgroundColor: orange[500],
          '&:hover': {
            backgroundColor: orange[700],
          },
          '& button': {
            borderRadius: '30px 0 0 30px',
            '&:focus': {
              borderRadius: '30px 0 0 30px',
            },
          },
        }}
      >
        <IconButton onClick={() => setColorSettingOpen(!isSettingOpen)}>
          <ColorLensIcon
            sx={{
              color: 'white',
            }}
          />
        </IconButton>
      </Box>
      <Drawer
        anchor="right"
        sx={{
          '& .MuiBackdrop-root': {
            background: 'transparent',
          },
        }}
        className={layoutType === LayoutType.BOXED ? 'boxed-drawer' : ''}
        open={isSettingOpen}
        onClose={() => setSettingOpen(false)}
      >
        <AppScrollbar
          sx={{
            width: { xs: 300, md: 360, xl: 400 },
          }}
        >
          <Box
            sx={(theme) => ({
              padding: { xs: '20px', xl: '28px 22px' },
              borderBottom: `1px solid ${theme.palette.divider}`,
            })}
          >
            <Box
              component="h3"
              sx={{
                mb: 0.5,
                fontSize: 18,
              }}
            >
              <IntlMessages id="customizer.customiseSidebar" />
            </Box>
            <Box
              component="p"
              sx={{
                mb: 0,
                color: 'text.secondary',
              }}
            >
              <IntlMessages id="customizer.customiseSidebarText" />
            </Box>
          </Box>
          <Box
            sx={{
              padding: { xs: '20px', xl: '28px 22px' },
            }}
          >
            <NavStyles />
            <LayoutTypes />
            <ThemeDirection />
            <ThemeHeader />
            <ThemeFooter />
            <SidebarSettings />
          </Box>
        </AppScrollbar>
      </Drawer>
      <Drawer
        anchor="right"
        open={isColorSettingOpen}
        onClose={() => setColorSettingOpen(false)}
        sx={{
          '& .MuiBackdrop-root': {
            background: 'transparent',
          },
        }}
        className={layoutType === LayoutType.BOXED ? 'boxed-drawer' : ''}
      >
        <AppScrollbar
          sx={{
            width: { xs: 300, md: 360, xl: 400 },
          }}
        >
          <Box
            sx={(theme) => ({
              padding: { xs: '20px', xl: '28px 22px' },
              borderBottom: `1px solid ${theme.palette.divider}`,
            })}
          >
            <Box
              component="h3"
              sx={{
                mb: 0.5,
                fontSize: 18,
              }}
            >
              <IntlMessages id="customizer.customiseTheme" />
            </Box>
            <Box
              component="p"
              sx={{
                mb: 0,
                color: 'text.secondary',
              }}
            >
              <IntlMessages id="customizer.customiseText" />
            </Box>
          </Box>
          <Box
            sx={{
              padding: { xs: '20px', xl: '28px 22px' },
            }}
          >
            <ThemeModes />
            <ThemeColors />
          </Box>
        </AppScrollbar>
      </Drawer>
    </Box>
  );
};

export default AppThemeSetting;
