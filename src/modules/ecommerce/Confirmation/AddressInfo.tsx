import React from 'react';
import AppCard from '@crema/components/AppCard';
import { Box, Button, Grid } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import AppGridContainer from '@crema/components/AppGridContainer';
import { AddressesType } from '@crema/types/models/ecommerce/EcommerceApp';
import Image from 'next/image';

type AddressInfoProps = {
  address: AddressesType;
};

const AddressInfo: React.FC<AddressInfoProps> = ({ address }) => {
  return (
    <AppCard style={{ marginBottom: 24 }}>
      <AppGridContainer>
        <Grid xs={12} md={6} item>
          <Box sx={{ px: 4 }}>
            <Box sx={{ my: 4, fontSize: 16, fontWeight: Fonts.BOLD }}>Delivery Address</Box>
            <Box sx={{ fontSize: 14, fontWeight: Fonts.BOLD }}>{address.name}</Box>
            <Box sx={{ fontSize: 14, fontWeight: Fonts.REGULAR }}>
              {address.addressLine}, {address.city}, {address.pin}
            </Box>
          </Box>

          <Box sx={{ p: 4, borderColor: '#D9DBE3' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 14,
                fontWeight: Fonts.BOLD,
              }}
            >
              Phone number
            </Box>
            <Box>{address.mobile}</Box>
          </Box>
        </Grid>
        <Grid xs={12} md={6} item>
          <Box sx={{ p: 4 }}>
            <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD }}>Your Rewards</Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                pl: 0,
                pr: 4,
                pt: 4,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Image src={'/assets/images/ecommerce/sms-icon.png'} alt="sms" width={36} height={36} />
                <Box sx={{ px: 3.5, fontSize: 14 }}>SMS updates at every step</Box>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Button
                  variant="contained"
                  sx={{
                    color: 'primary',
                    minWidth: 120,
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                p: 4,
                pl: 0,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Image src={'/assets/images/ecommerce/add-person.png'} alt="sms" height={36} width={36} />
                <Box sx={{ px: 3.5, fontSize: 14 }}>Order shared with 1 Person</Box>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Button
                  variant="contained"
                  sx={{
                    color: 'primary',
                    minWidth: 120,
                  }}
                >
                  Manage
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </AppGridContainer>
    </AppCard>
  );
};

export default AddressInfo;
