import { MailType } from '@crema/types/models/apps/Mail';
import mailData from '@crema/fakedb/apps/mail/mailList';

let mailList = mailData;
// export const PUT = async (request) => {
//   try {
//     const reqBody = await request.json();
//     const { mail } = reqBody;
//     mailList = mailList.map((item) => {
//       if (item.id === mail.id) {
//         item.messages.map((message) => {
//           message.isStarred = mail.isStarred;
//         });
//       }
//
//     });
//
//     return new Response(JSON.stringify({ data: mail }), { status: 200 });
//   } catch (error) {
//     return new Response('Internal Server Error', { status: 500 });
//   }
// };
//
import { NextRequest } from 'next/server';

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { mailIds, status } = reqBody;
    mailList = mailList.map((mail) => {
      if (mailIds.includes(mail.id)) {
        mail.isStarred = !!status;
        return mail;
      }
      return mail;
    });
    const updatedMails = mailList.filter((mail: MailType) => mailIds.includes(mail.id));
    return new Response(JSON.stringify(updatedMails), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
