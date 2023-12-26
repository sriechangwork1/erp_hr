import mailData from '@crema/fakedb/apps/mail/mailList';
import { NextRequest } from 'next/server';
import { MailType } from '@crema/types/models/apps/Mail';
let mailList = mailData;
export const GET = async (request: NextRequest) => {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);
    const response = mailList.find(
      (mail: MailType) => mail.id === parseInt(params.id),
    );
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { mail } = reqBody;
    mailList = mailList.map((item) => (item.id === mail.id ? mail : item));
    return new Response(JSON.stringify(mail), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
