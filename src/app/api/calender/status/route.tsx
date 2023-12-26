import statusList from '@crema/fakedb/apps/todo/statusList';

export const GET = async () => {
  try {
    return new Response(JSON.stringify(statusList), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
