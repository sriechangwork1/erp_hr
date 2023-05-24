import React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import CurrencyCell from '../BuySell/CurrencyCell';
import { Fonts } from '@crema/constants/AppEnums';
import { CoinListType } from '@crema/models/dashboards/Crypto';
import cryptoData from '@crema/fakedb/dashboard/crypto';

const ChartHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        mx: -2,
      }}
    >
      <Box sx={{ px: 2, pb: { xs: 2, lg: 0 } }}>
        <Select
          sx={{
            cursor: 'pointer',
          }}
          value={1}
        >
          {cryptoData.buySell.coinList.map((coin: CoinListType) => {
            return CurrencyCell(coin);
          })}
        </Select>
      </Box>
      <Box sx={{ px: 2, pb: { xs: 2, lg: 0 } }}>
        <Box
          component="h3"
          sx={{
            color: 'text.primary',
            fontWeight: Fonts.SEMI_BOLD,
          }}
        >
          $ 41.580
        </Box>
        <Box
          sx={{
            color: 'text.secondary',
          }}
        >
          Low Price
        </Box>
      </Box>
      <Box sx={{ px: 2, pb: { xs: 2, lg: 0 } }}>
        <Box
          component="h3"
          sx={{
            color: '#11C15B',
            fontWeight: Fonts.SEMI_BOLD,
          }}
        >
          $ 41.580
        </Box>
        <Box
          sx={{
            color: 'text.secondary',
          }}
        >
          High Price
        </Box>
      </Box>
      <Box sx={{ px: 2, pb: { xs: 2, lg: 0 } }}>
        <Box
          component="h3"
          sx={{
            color: 'text.primary',
            fontWeight: Fonts.SEMI_BOLD,
          }}
        >
          $ 41.580
        </Box>
        <Box
          sx={{
            color: 'text.secondary',
          }}
        >
          24H Volume
        </Box>
      </Box>
      <Box sx={{ px: 2, pb: { xs: 2, lg: 0 } }}>
        <Box
          component="h3"
          sx={{
            color: '#F60002',
            fontWeight: Fonts.SEMI_BOLD,
          }}
        >
          $ 41.580
        </Box>
        <Box
          sx={{
            color: 'text.secondary',
          }}
        >
          24H Change
        </Box>
      </Box>
    </Box>
  );
};

export default ChartHeader;
