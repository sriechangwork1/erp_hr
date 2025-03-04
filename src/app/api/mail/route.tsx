import mailData from '@crema/fakedb/apps/mail/mailList';
import folderList from '@crema/fakedb/apps/mail/folderList';
import labelList from '@crema/fakedb/apps/mail/labelList';
import { NextRequest } from 'next/server';

let mailList = mailData;
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { mail } = reqBody;
    mailList = [mail, ...mailList];
    return new Response(JSON.stringify(mail), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { mails } = reqBody;
    mailList = mails;
    return new Response(JSON.stringify(mails), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const GET = async (request: NextRequest) => {
  try {
    const params: any = Object.fromEntries(request.nextUrl.searchParams);

    let folderMailList: any = [];
    if (params?.type === 'folder') {
      if (params.name === 'starred') {
        folderMailList = mailList.filter((mail) => mail.isStarred);
      } else {
        const folderId = folderList?.find((folder: any) => folder?.alias === params.name)?.id;
        folderMailList = mailList.filter((mail) => mail.folderValue === folderId);
      }
    } else if (params?.type === 'label') {
      const labelType = labelList.find((label) => label.alias === params.name)?.id;
      folderMailList = mailList.filter((mail) => mail.label.id === labelType);
    }
    const index = params?.page * 15;
    const count = folderMailList.length;
    const data = folderMailList.length > 15 ? folderMailList.slice(index, index + 15) : folderMailList;
    return new Response(JSON.stringify({ data: folderMailList, count: folderMailList.length }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
