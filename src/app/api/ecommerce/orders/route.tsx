import { recentOrders } from '@crema/fakedb/ecommerce/ecommerceData';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const { search, page }: any = Object.fromEntries(request.nextUrl.searchParams);
  try {
    let orders = [...recentOrders];

    if (search) {
      orders = orders.filter(
        (order) =>
          order.customer.toLowerCase().includes(search.toLowerCase()) ||
          order.product.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return new Response(
      JSON.stringify({
        count: orders.length,
        data: orders.splice(page * 10, (page + 1) * 10),
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
