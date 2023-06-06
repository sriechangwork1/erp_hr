import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ProductSpecType } from '@crema/models/ecommerce/EcommerceApp';

type ProductSpecificationProps = {
  productSpec: ProductSpecType[];
};

const ProductSpecification = ({ productSpec }: ProductSpecificationProps) => {
  return (
    <>
      <Box
        component="h3"
        sx={{
          color: 'text.primary',
          fontSize: 16,
          mt: 4,
          mb: 3,
        }}
      >
        Specification
      </Box>
      <Grid container spacing={3}>
        {productSpec.map((data: any) => (
          <React.Fragment key={data.id}>
            <Grid item xs={4}>
              <Box
                sx={{
                  color: 'text.secondary',
                }}
              >
                {data.title}
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box> {data.desc}</Box>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </>
  );
};

export default ProductSpecification;
