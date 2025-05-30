import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AppLngSwitcher from '../../../AppLngSwitcher';
import Box from '@mui/material/Box';
import AppSearchBar from '../../../AppSearchBar';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppMessages from '../../../AppMessages';
import AppNotifications from '../../../AppNotifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppTooltip from '../../../AppTooltip';
import { alpha } from '@mui/material/styles';
import AppLogo from '../../components/AppLogo';
import UserInfo from '../../components/UserInfo';

type Props = {
  toggleNavCollapsed: () => void;
};
const AppHeader = ({ toggleNavCollapsed }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      color="inherit"
      sx={(theme) => ({
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'background.paper',
        transition: 'width 0.5s ease',
        width: '100%',
      })}
      className="app-bar"
    >
      <Toolbar
        sx={{
          boxSizing: 'border-box',
          minHeight: { xs: 56, sm: 70 },
          paddingLeft: { xs: 5 },
          paddingRight: { xs: 5, md: 7.5, xl: 12.5 },
        }}
      >
        <IconButton
          sx={{ color: 'text.secondary', display: { lg: 'none', xs: 'block' } }}
          edge="start"
          className="menu-btn"
          color="inherit"
          aria-label="open drawer"
          onClick={() => toggleNavCollapsed()}
          size="large"
        >
          <MenuIcon
            sx={{
              width: 35,
              height: 35,
            }}
          />
        </IconButton>
        <Box
          sx={{
            '& .logo-text': {
              display: { xs: 'none', sm: 'block' },
            },
          }}
        >
          <AppLogo />
        </Box>

        <Box
          sx={{
            minHeight: 40,
            position: 'relative',
            display: { xs: 'none', sm: 'block' },
            '& .searchRoot': {
              position: { xs: 'absolute', sm: 'relative' },
              right: { xs: 0, sm: 'auto' },
              top: { xs: 0, sm: 'auto' },
            },
          }}
        >
          <AppSearchBar iconPosition="right" placeholder="Search…" />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        <Box sx={{ ml: 4 }}>
          <AppLngSwitcher iconOnly={true} tooltipPosition="bottom" />
        </Box>

        <Box
          sx={{
            ml: 4,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              marginLeft: -2,
              marginRight: -2,
            }}
          >
            <Box
              sx={{
                px: 1.85,
              }}
            >
              <AppNotifications />
            </Box>
            <Box
              sx={{
                px: 1.85,
              }}
            >
              <AppMessages />
            </Box>
          </Box>

          <Box
            sx={{
              ml: { sm: 4 },
              mr: { xs: 4, sm: 0 },
              minWidth: { md: 220 },
              '& .user-info-view': {
                p: 0,
              },
              '& .user-info': {
                display: { xs: 'none', md: 'block' },
              },
            }}
          >
            <UserInfo />
          </Box>

          <Box
            sx={{
              position: 'relative',
              display: { sm: 'none', xs: 'flex' },
              alignItems: 'center',
              marginLeft: -2,
              marginRight: -2,
            }}
          >
            <Box
              sx={{
                px: 1.85,
              }}
            >
              <AppTooltip title="More">
                <IconButton
                  sx={(theme) => ({
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    color: theme.palette.text.secondary,
                    backgroundColor: theme.palette.background.default,
                    border: 1,
                    borderColor: 'transparent',
                    '&:hover, &:focus': {
                      color: theme.palette.text.primary,
                      backgroundColor: alpha(theme.palette.background.default, 0.9),
                      borderColor: alpha(theme.palette.text.secondary, 0.25),
                    },
                  })}
                  onClick={handleClick}
                  size="large"
                >
                  <MoreVertIcon />
                </IconButton>
              </AppTooltip>
            </Box>
          </Box>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem>
              <AppNotifications isMenu />
            </MenuItem>
            <MenuItem>
              <AppMessages isMenu />
            </MenuItem>
            <MenuItem>Setting</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default AppHeader;
