import { blogContent, blogSidebar } from '@crema/fakedb/extraPages';
import { NextRequest } from 'next/server';

const blogContentData = blogContent;
export const GET = async (request: NextRequest) => {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);
    const { id } = params;
    let blogDetail;
    if (id) blogDetail = blogContentData.find((item) => String(item.id) === id);
    else blogDetail = blogContentData[0];
    return new Response(JSON.stringify({ blogDetail, blogSidebar }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
