import { postsList } from '@crema/fakedb/apps/wall';
import { NextRequest } from 'next/server';
import { PostObjType } from '@crema/types/models/apps/Wall';
import { generateRandomUniqueNumber } from '@crema/helpers/Common';
let posts = postsList;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { postId, comment } = reqBody;
    const post = posts.find((item: PostObjType) => item?.id === postId) as PostObjType;
    const newComment = {
      id: generateRandomUniqueNumber(),
      date: new Date().toString(),
      liked: false,
      ...comment,
    };
    post.comments = post?.comments.concat(newComment);
    posts = posts.map((item: PostObjType) => (item?.id === post?.id ? post : item)) as PostObjType[];
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
