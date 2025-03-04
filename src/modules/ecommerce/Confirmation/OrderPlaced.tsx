import React from 'react';
import AppCard from '@crema/components/AppCard';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import { CartItemsType } from '@crema/types/models/ecommerce/EcommerceApp';
import { getTotalPrice } from './helper';
import Image from 'next/image';

type OrderPlacedProps = {
  cartItems: CartItemsType[];
};

const OrderPlaced: React.FC<OrderPlacedProps> = ({ cartItems }) => {
  return (
    <AppCard style={{ marginBottom: 24 }}>
      <AppGridContainer>
        <Grid xs={12} md={8} item>
          <Box sx={{ display: 'flex', p: 4, alignItems: 'center' }}>
            <Image src={'/assets/images/ecommerce/gift.png'} alt="confirm" width={72} height={80} />
            <Box
              sx={{
                p: 4,
              }}
            >
              <Box component="h3" sx={{ color: 'primary.main', mb: 0.5, fontSize: 16 }}>
                Order placed for ${getTotalPrice(cartItems)}!
              </Box>
              <Box sx={{ fontSize: 14 }}>Your {cartItems?.length} Item will be delivered by Mon, 27 Aug 20.</Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={4} item>
          <Box sx={{ display: 'flex', p: 4 }}>
            <Box>
              <Box sx={{ fontSize: 14 }}>Why call? Just click!</Box>
              <Box sx={{ py: 3 }}>Easily track all your orders! </Box>
              <Button variant="contained" color="primary">
                Go to My Orders
              </Button>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Image
                style={{ marginTop: 20 }}
                src={'/assets/images/ecommerce/confirm-box.png'}
                alt="confirm"
                height={60}
                width={57}
              />
            </Box>
          </Box>
        </Grid>
      </AppGridContainer>
    </AppCard>
  );
};
export default OrderPlaced;
