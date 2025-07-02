import { brandData, cartItems } from '@crema/fakedb/ecommerce/ecommerceData';
import { NextRequest } from 'next/server';

let cartItemsData = cartItems;
export const POST = async (request: NextRequest) => {
  const reqBody = await request.json();
  try {
    const { product } = reqBody;
    cartItemsData = cartItemsData.filter((item) => item.id !== product.id);

    return new Response(JSON.stringify(cartItemsData), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
