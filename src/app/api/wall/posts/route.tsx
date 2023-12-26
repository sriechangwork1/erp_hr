import { postsList } from '@crema/fakedb/apps/wall';
import { NextRequest } from 'next/server';
import { PostObjType } from '@crema/types/models/apps/Wall';
let posts = postsList;

export const GET = async () => {
  try {
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { post } = reqBody;
    const newPost = {
      id: Math.floor(Math.random() * 10000),
      date: new Date().toString(),
      likes: 0,
      shares: 0,
      views: 0,
      comments: [],
      ...post,
    };
    posts = [newPost, ...posts];
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { postId, status } = reqBody;
    const post = posts.find(
      (item: PostObjType) => item?.id === postId,
    ) as PostObjType;
    post.liked = status as boolean;
    if (status) {
      post.likes += 1;
    } else {
      post.likes -= 1;
    }
    posts = posts.map((item: PostObjType) =>
      item?.id === post?.id ? post : item,
    ) as PostObjType[];
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
