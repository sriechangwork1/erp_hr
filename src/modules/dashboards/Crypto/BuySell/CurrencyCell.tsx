import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { CoinListType } from '@crema/types/models/dashboards/Crypto';

const CurrencyCell = (coin: CoinListType) => {
  return (
    <MenuItem
      key={coin.id}
      value={coin.id}
      sx={{
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {coin.icon ? (
          <Avatar
            sx={{
              marginRight: 2.5,
              height: 24,
              width: 24,
            }}
            src={coin.icon}
          />
        ) : (
          <Avatar
            sx={{
              marginRight: 2.5,
              height: 24,
              width: 24,
            }}
          >
            {coin.name.toUpperCase()}
          </Avatar>
        )}
        <Box component="span">{coin.name}</Box>
        <Box
          component="span"
          sx={{
            ml: 3,
            color: 'text.secondary',
          }}
        >
          {coin.shortName}
        </Box>
      </Box>
    </MenuItem>
  );
};

export default CurrencyCell;
