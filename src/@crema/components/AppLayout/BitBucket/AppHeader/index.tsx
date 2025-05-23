import React from 'react';
import SearchBar from '../../../AppSearchBar';
import AppLogo from '../../components/AppLogo';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BitBucketHeaderWrapper from './BitBucketHeaderWrapper';

type Props = {
  toggleNavCollapsed: () => void;
};
const AppHeader = ({ toggleNavCollapsed }: Props) => {
  return (
    <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
      <BitBucketHeaderWrapper className="bit-bucket-header">
        <IconButton
          edge="start"
          className="menu-btn"
          color="inherit"
          aria-label="open drawer"
          onClick={() => toggleNavCollapsed()}
        >
          <MenuIcon className="menu-icon" />
        </IconButton>
        <AppLogo />
        <Box
          sx={{
            ml: 'auto',
          }}
        >
          <SearchBar borderLight placeholder="Search…" />
        </Box>
      </BitBucketHeaderWrapper>
    </Box>
  );
};
export default AppHeader;
