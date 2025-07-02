import ecommerceData from '@crema/fakedb/ecommerce/ecommerceData';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const { filterData, page }: any = Object.fromEntries(request.nextUrl.searchParams);
  try {
    const index = page * 10;
    const total = ecommerceData.length;
    const list = ecommerceData.length > 10 ? ecommerceData.slice(index, index + 10) : ecommerceData;
    return new Response(JSON.stringify({ list, total }), {
      status: 200,
    }); //TODO: change to list
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
