import { brandData, cartItems } from '@crema/fakedb/ecommerce/ecommerceData';
import { NextRequest } from 'next/server';

let cartItemsData = cartItems;
export const GET = async () => {
  try {
    let data = cartItemsData;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const POST = async (request: NextRequest) => {
  const reqBody = await request.json();
  try {
    const { product } = reqBody;
    if (cartItemsData.some((item) => +item.id === +product.id)) {
      cartItemsData = cartItemsData.map((item) => {
        if (+item.id === +product.id) {
          item.count = +item.count + 1;
        }
        return item;
      });

      return new Response(JSON.stringify(cartItemsData), {
        status: 200,
      });
    } else {
      const filteredBrand = brandData.find((brand) => brand.id === product.brand);
      cartItemsData = cartItemsData.concat({
        id: product.id,
        brand: filteredBrand?.name,
        discount: product.discount,
        image: product.image[0].src,
        mrp: product.mrp,
        title: product.title,
        count: 1,
      });
      return new Response(JSON.stringify(cartItemsData), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { product } = reqBody;
    cartItemsData = cartItemsData.map((item) => (item.id === product.id ? product : item));
    return new Response(JSON.stringify(cartItemsData), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
