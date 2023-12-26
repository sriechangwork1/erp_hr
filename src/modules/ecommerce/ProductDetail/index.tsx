'use client';
import React, { useEffect } from 'react';
import AppCard from '@crema/components/AppCard';
import AppGridContainer from '@crema/components/AppGridContainer';

import AppAnimate from '@crema/components/AppAnimate';
import { useParams } from 'next/navigation';
import AppInfoView from '@crema/components/AppInfoView';
import { useGetDataApi } from '@crema/hooks/APIHooks';

import ProductImageSlide from './ProductImageSlide';
import Header from './Header';
import ProductView from './ProductView/index';
import SimilarProduct from './SimilarProduct';
import AppLoader from '@crema/components/AppLoader';
import { ProductDataType } from '@crema/types/models/ecommerce/EcommerceApp';

const ProductDetail = () => {
  const params = useParams();

  const [{ apiData: currentProduct, loading }, { setQueryParams }] =
    useGetDataApi<ProductDataType>(
      'ecommerce',
      {} as ProductDataType,
      { id: params?.all?.[0] ? params?.all?.[0] : 0 },
      false,
    );

  useEffect(() => {
    setQueryParams({ id: params?.all?.[0] });
  }, [params?.all?.[0]]);

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : currentProduct ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppCard>
            <Header product={currentProduct} />
            <AppGridContainer>
              <ProductImageSlide product={currentProduct} />
              <ProductView product={currentProduct} />
            </AppGridContainer>
            <SimilarProduct />
          </AppCard>
        </AppAnimate>
      ) : null}
      <AppInfoView />
    </>
  );
};

export default ProductDetail;
