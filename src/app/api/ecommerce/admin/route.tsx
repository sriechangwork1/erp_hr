import ecommerceData from '@crema/fakedb/ecommerce/ecommerceData';
import { NextRequest } from 'next/server';

import { ProductDataType } from '@crema/types/models/ecommerce/EcommerceApp';
let ecommerceListingData = ecommerceData;
export const GET = async (request: NextRequest) => {
  const { id } = Object.fromEntries(request.nextUrl.searchParams);
  try {
    if (+id >= 1) {
      const data = ecommerceListingData.filter((item: ProductDataType) => +item.id === +id);
      if (data.length > 0)
        return new Response(JSON.stringify(data[0]), {
          status: 200,
        });
    }
    return new Response(JSON.stringify(ecommerceListingData[0]), {
      status: 200,
    }); //TODO: change to list
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { product } = reqBody;
    ecommerceListingData = ecommerceListingData.concat({
      id: ecommerceListingData.length + 1,
      ...product,
    });
    return new Response(JSON.stringify(ecommerceListingData), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { product } = reqBody;
    ecommerceListingData = ecommerceListingData.map((item) => {
      if (item.id === product.id) {
        return product;
      }
      return item;
    });
    return new Response(JSON.stringify(ecommerceListingData), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
