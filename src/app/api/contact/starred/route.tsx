import contactData from '@crema/fakedb/apps/contact/contactList';
import { NextRequest } from 'next/server';

let contactList = contactData;

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { contactIds, status } = reqBody;
    contactList = contactList.map((contact) => {
      if (contactIds.includes(contact.id)) {
        contact.isStarred = !!status;
        return contact;
      }
      return contact;
    });
    const updatedList = contactList.filter((contact) => contactIds.includes(contact.id));
    return new Response(JSON.stringify(updatedList), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
