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
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
